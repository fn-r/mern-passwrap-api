import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'
import countsRoutes from './routes/counts.js'
import notesRoutes from './routes/notes.js'
import appsRoutes from './routes/passwords/apps.js'
import websRoutes from './routes/passwords/webs.js'
import devsRoutes from './routes/passwords/devs.js'

// express app
const app = express()

// middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://passwrap-ui.netlify.app',
    ],
    credentials: true, //included credentials as true to get cookies
}))
app.use(cookieParser())
app.use(express.json())

// routes
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/counts', countsRoutes)
app.use('/api/apps', appsRoutes)
app.use('/api/webs', websRoutes)
app.use('/api/devs', devsRoutes)
app.use('/api/notes', notesRoutes)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 404;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage
    })
})

// connect to database
const PORT = process.env.PORT || process.env.DEV_PORT
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => {
        // listen for requests
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`)
        })
    })
    .catch((error) => console.log(error))