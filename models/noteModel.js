import mongoose from 'mongoose'

const Schema = mongoose.Schema

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        default: ""
    }
}, { timestamps: true })

// 'notes' in mongoDB collection
const Note = mongoose.model('Note', noteSchema)

export default Note