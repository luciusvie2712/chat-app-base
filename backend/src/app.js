import express from 'express'
import dotenv from 'dotenv' 
dotenv.config()
import { connectDB } from './libs/db.js'
import authRouter from "./routes/authRoute.js"
import cookieParser from "cookie-parser"

const app = express()
const PORT = process.env.PORT || 8000   

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})



