import mongoose from 'mongoose'

import { createError } from '../../utils/error.js'
import { encrypt, decrypt } from '../../utils/encryptionHandler.js'
import App from '../../models/passwords/appModel.js'
import User from '../../models/userModel.js'

// GET all passwords
export const getApps = async (req, res, next) => {
    try {
        const passwords = await App.find().sort({ createdAt: -1 })
        const decrypted_passwords = passwords.map(password => {
            password = {...password._doc,}
            password = {
                ...password,
                username: decrypt(password.username),
                email: decrypt(password.email),
                password: decrypt(password.password),
                notes: decrypt(password.notes)
            }
            return password
        })

        res.status(200).json(decrypted_passwords)
    } catch (error) {
        next(error)
    }
}

// GET single password
export const getApp = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404, 'No such password'))
    }

    try {
        let password = await App.findById(id)
        const decrypted_password = {
            ...password._doc,
            username: decrypt(password.username),
            email: decrypt(password.email),
            password: decrypt(password.password),
            notes: decrypt(password.notes)
        }

        res.status(200).json(decrypted_password)
    } catch (error) {
        next(error)
    }
}

// CREATE single password
export const createApp = async (req, res, next) => {
    const { user_id } = req.params
    const { name, ...password } = req.body
    for (let key in password) {
        password[key] = encrypt(password[key])
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        next(createError(404, 'No such user'))
    }

    try {
        const newApps = new App({
            name: name,
            ...password
        })
        const savedApps = await newApps.save()

        try {
            await User.findByIdAndUpdate(user_id, {
                $push: { passwordList: savedApps._id },
            });
            res.status(201).send(`Password for ${savedApps.name} has been created`)
        } catch (error) {
            next(createError(409, error.message))
        }
    } catch (error) {
        next(createError(409, error.message))
    }
}

// DELETE single password
export const deleteApp = async (req, res, next) => {
    const { id, user_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(user_id)) {
        next(createError(404, 'No such password or user'))
    }

    try {
        const password = await App.findByIdAndDelete(id)

        try {
            await User.findByIdAndUpdate(user_id, {
                $pull: { passwordList: id },
            });

            res.status(200).json(`Password for ${password.name} has been deleted`)
        } catch (error) {
            next(error)
        }
    } catch (error) {
        next(error)
    }
}

// UPDATE a password
export const updateApp = async (req, res, next) => {
    const { id } = req.params
    const { name, ...password } = req.body
    for (let key in password) {
        password[key] = encrypt(password[key])
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404, 'No such password'))
    }

    try {
        const updatedApp = await App.findByIdAndUpdate(
            id,
            { name, ...password },
            { new: true }
        )
        res.status(200).json(updatedApp)
    } catch (error) {
        next(error)
    }
}