import express from 'express'

import { 
    getUser,
} from '../controllers/usersController.js'
import { verifyToken, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

router.get('/checkauthentication', verifyToken, (req, res, next) => {
    res.send('hello user, you are logged in')
})

router.get('/checkuser/:id', verifyUser, (req, res, next) => {
    res.send('hello user, you are logged in and you can access home')
})

router.get('/:id', verifyUser, getUser)

export default router