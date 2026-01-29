import express from 'express'
import dotenv from 'dotenv' 
dotenv.config()
import { connectDB } from './libs/db.js'
import authRouter from "./routes/authRoute.js"
import userRouter from "./routes/userRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { protectedMiddleware } from './middlewares/authMiddleware.js'

const app = express()
const PORT = process.env.PORT || 8000   


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true, 
}))

app.use('/api/auth', authRouter)

app.use(protectedMiddleware)
app.use('/api/user', userRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})



