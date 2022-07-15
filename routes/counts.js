import express from 'express'

import Note from '../models/noteModel.js'
import App from '../models/passwords/appModel.js'
import Dev from '../models/passwords/devModel.js'
import Web from '../models/passwords/webModel.js'

import { verifyUser } from '../utils/verifyToken.js'
const router = express.Router()

export const getCounts = async (req, res, next) => {
    try {
        const appCount = await App.countDocuments();
        const noteCount = await Note.countDocuments();
        const webCount = await Web.countDocuments();
        const devCount = await Dev.countDocuments();

        res.status(200).json([
            { type: "apps", count: appCount },
            { type: "notes", count: noteCount },
            { type: "webs", count: webCount },
            { type: "devs", count: devCount },
        ]);
    } catch (error) {
        next(error);
    }
}

router.get('/:user_id', verifyUser, getCounts)

export default router