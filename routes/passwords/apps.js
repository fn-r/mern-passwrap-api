import express from 'express'

import { 
    getApps,
    getApp,
    createApp,
    deleteApp,
    updateApp,
} from '../../controllers/passwords/appsController.js'
import { verifyUser } from '../../utils/verifyToken.js'

const router = express.Router()

router.get('/test', getApps)
router.get('/:user_id', verifyUser, getApps)

router.get('/:id/:user_id', verifyUser, getApp)
router.post('/:user_id', verifyUser, createApp)
router.delete('/:id/:user_id', verifyUser, deleteApp)
router.patch('/:id/:user_id', verifyUser, updateApp)

export default router