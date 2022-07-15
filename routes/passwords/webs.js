import express from 'express'

import { 
    getWebs,
    getWeb,
    createWeb,
    deleteWeb,
    updateWeb,
} from '../../controllers/passwords/websController.js'
import { verifyUser } from '../../utils/verifyToken.js'

const router = express.Router()

router.get('/:user_id', getWebs)

router.get('/:id/:user_id', verifyUser, getWeb)
router.post('/:user_id', verifyUser, createWeb)
router.delete('/:id/:user_id', verifyUser, deleteWeb)
router.patch('/:id/:user_id', verifyUser, updateWeb)

export default router