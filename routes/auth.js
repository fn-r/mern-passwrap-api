import express from 'express'

import { 
    authLogin,
    authLogout
} from '../controllers/authController.js'

const router = express.Router()

router.post('/login', authLogin)
router.get('/logout', authLogout)

export default router