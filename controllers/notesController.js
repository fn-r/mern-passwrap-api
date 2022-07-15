import mongoose from 'mongoose'

import { createError } from '../utils/error.js'
import { encrypt, decrypt } from '../utils/encryptionHandler.js'
import Note from '../models/noteModel.js'
import User from '../models/userModel.js'

// GET all notes
export const getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find().sort({updatedAt: -1})
        const decrypted_notes = notes.map(note => {
            note = {...note._doc,}
            note = {
                ...note,
                title: decrypt(note.title),
                notes: decrypt(note.notes)
            }
            return note
        })

        res.status(200).json(decrypted_notes)
    } catch (error) {
        next(error)
    }
}

// GET single note
export const getNote = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404, 'No such note'))
    }

    try {
        let note = await Note.findById(id)
        const decrypted_note = {
            ...note._doc,
            title: decrypt(note.username),
            notes: decrypt(note.notes)
        }

        res.status(200).json(decrypted_note)
    } catch (error) {
        next(error)
    }
}

// CREATE single note
export const createNote = async (req, res, next) => {
    const { user_id } = req.params
    const note = req.body
    for (let key in note) {
        note[key] = encrypt(note[key])
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        next(createError(404, 'No such user'))
    }

    try {
        const newNotes = new Note(note)
        const savedNotes = await newNotes.save()

        try {
            await User.findByIdAndUpdate(user_id, {
                $push: { noteList: savedNotes._id },
            });
            res.status(201).send(`Password for ${savedNotes.name} has been created`)
        } catch (error) {
            next(createError(409, error.message))
        }
    } catch (error) {
        next(createError(409, error.message))
    }
}

// DELETE single note
export const deleteNote = async (req, res, next) => {
    const { id, user_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(user_id)) {
        next(createError(404, 'No such note or user'))
    }

    try {
        const note = await Note.findByIdAndDelete(id)

        try {
            await User.findByIdAndUpdate(user_id, {
                $pull: { noteList: id },
            });

            res.status(200).json(`Password for ${note.name} has been deleted`)
        } catch (error) {
            next(error)
        }
    } catch (error) {
        next(error)
    }
}

// UPDATE a note
export const updateNote = async (req, res, next) => {
    const { id } = req.params
    const note = req.body
    for (let key in note) {
        note[key] = encrypt(note[key])
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404, 'No such note'))
    }

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id, note, { new: true }
        )
        res.status(200).json(updatedNote)
    } catch (error) {
        next(error)
    }
}