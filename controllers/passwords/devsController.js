import mongoose from 'mongoose'

import { createError } from '../../utils/error.js'
import { encrypt, decrypt } from '../../utils/encryptionHandler.js'
import Dev from '../../models/passwords/devModel.js'
import User from '../../models/userModel.js'

// GET all passwords
export const getDevs = async (req, res, next) => {
    try {
        const passwords = await Dev.find().sort({ createdAt: -1 })
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
export const getDev = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404, 'No such password'))
    }

    try {
        let password = await Dev.findById(id)
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
export const createDev = async (req, res, next) => {
    const { user_id } = req.params
    const { name, url, type, ...password } = req.body
    for (let key in password) {
        password[key] = encrypt(password[key])
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        next(createError(404, 'No such user'))
    }

    try {
        const newDevs = new Dev({
            name: name,
            url: url,
            type: type,
            ...password
        })
        const savedDevs = await newDevs.save()

        try {
            await User.findByIdAndUpdate(user_id, {
                $push: { passwordList: savedDevs._id },
            });
            res.status(201).send(`Password for ${savedDevs.url} has been created`)
        } catch (error) {
            next(createError(409, error.message))
        }
    } catch (error) {
        next(createError(409, error.message))
    }
}

// DELETE single password
export const deleteDev = async (req, res, next) => {
    const { id, user_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(user_id)) {
        next(createError(404, 'No such password or user'))
    }

    try {
        const password = await Dev.findByIdAndDelete(id)

        try {
            await User.findByIdAndUpdate(user_id, {
                $pull: { passwordList: id },
            });

            res.status(200).json(`Password for ${password.url} has been deleted`)
        } catch (error) {
            next(error)
        }
    } catch (error) {
        next(error)
    }
}

// UPDATE a password
export const updateDev = async (req, res, next) => {
    const { id } = req.params
    const { name, url, type, ...password } = req.body
    for (let key in password) {
        password[key] = encrypt(password[key])
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404, 'No such password'))
    }

    try {
        const updatedDev = await Dev.findByIdAndUpdate(
            id,
            { name, url, type, ...password },
            { new: true }
        )
        res.status(200).json(updatedDev)
    } catch (error) {
        next(error)
    }
}