import mongoose from 'mongoose'

const Schema = mongoose.Schema

const devSchema = new Schema({
    name: {
        type: String,
        required: true
    },
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
    type: {
        type: String,
        required: true
    }
}, { timestamps: true })

// 'devs' in mongoDB collection
const Dev = mongoose.model('Dev', devSchema)

export default Dev