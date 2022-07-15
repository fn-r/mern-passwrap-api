import mongoose from 'mongoose'

const Schema = mongoose.Schema

const appSchema = new Schema({
    name: {
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
    }
}, { timestamps: true })

// 'apps' in mongoDB collection
const App = mongoose.model('App', appSchema)

export default App