import express from 'express'

import { 
    getDevs,
    getDev,
    createDev,
    deleteDev,
    updateDev,
} from '../../controllers/passwords/devsController.js'
import { verifyUser } from '../../utils/verifyToken.js'

const router = express.Router()

router.get('/:user_id', getDevs)

router.get('/:id/:user_id', verifyUser, getDev)
router.post('/:user_id', verifyUser, createDev)
router.delete('/:id/:user_id', verifyUser, deleteDev)
router.patch('/:id/:user_id', verifyUser, updateDev)

export default router