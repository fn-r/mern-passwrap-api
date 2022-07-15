import mongoose from 'mongoose'

import { createError } from '../utils/error.js'
import User from '../models/userModel.js'

// GET single user
export const getUser = async (req, res, next) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404, 'No such user'))
    }

    try {
        const user = await User.findById(id)
        res.status(200).json(user)    
    } catch (error) {
        next(error)
    }
}