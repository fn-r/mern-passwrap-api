import express from 'express'

import { 
    getNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote,
} from '../controllers/notesController.js'
import { verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

router.get('/:user_id', verifyUser, getNotes)

router.get('/:id/:user_id', verifyUser, getNote)
router.post('/:user_id', verifyUser, createNote)
router.delete('/:id/:user_id', verifyUser, deleteNote)
router.patch('/:id/:user_id', verifyUser, updateNote)

export default router