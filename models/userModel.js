import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    passwordList: {
        type: [String]
    },
    noteList: {
        type: [String]
    }
}, { timestamps: true })

// 'users' in mongoDB collection
const User = mongoose.model('User', userSchema)

export default User