import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { createError } from '../utils/error.js'
import User from '../models/userModel.js'
import nodemon from 'nodemon'

export const authLogin = async (req, res, next) => {
    const user = req.body

    try {
        const authUser = await User.findOne({ username: user.username })
        if (!authUser) return next(createError(404, 'User not found!'))

        const isPasswordCorrect = await bcrypt.compare(user.password, authUser.password)
        if (!isPasswordCorrect) return next(createError(400, 'Wrong password or username!'))

        const token = jwt.sign({ id: authUser._id }, process.env.JWT_TOKEN)
        const { password, passwordList, noteList, ...otherDetails } = authUser._doc

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            domain: 'mern-passwrap-api.herokuapp.com'
        })
        res.status(200).json({ ...otherDetails })
    } catch (error) {
        next(error)
    }
}

export const authLogout = async (req, res, next) => {
    res.cookie('access_token', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
        domain: 'mern-passwrap-api.herokuapp.com'
    }).send('User successfully logout')
}