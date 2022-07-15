import mongoose from 'mongoose'

const Schema = mongoose.Schema

const webSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    username: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        default: ""
    },
}, { timestamps: true })

// 'webs' in mongoDB collection
const Web = mongoose.model('Web', webSchema)

export default Web