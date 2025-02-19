import 'dotenv/config'
import express from 'express'
import connectDB from './config/db.js'
import cors from 'cors'
import multer from 'multer'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import userRouter from './routes/users/index.js'
import contactRouter from './routes/contacts/index.js'

const PORT = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/users', userRouter)
app.use('/api/contacts', contactRouter)

app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`)

    if (err instanceof multer.MulterError) {
        res.status(400).json({ message: err.message })
    } else if (err.message === 'Invalid file type. Only image files are allowed.') {
        res.status(400).json({ message: err.message })
    } else {
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode
        res.status(statusCode)
        res.json({
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        })
    }
})

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

process.on('SIGTERM', () => {
    console.log('SIGTERM received. Closing server...')
    server.close(() => {
        console.log('Server closed.')
    })
})