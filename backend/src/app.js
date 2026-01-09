import express from 'express'
import dotenv from 'dotenv' 
dotenv.config()
import { connectDB } from './libs/db.js'

const app = express()
const PORT = process.env.PORT || 8000   

app.use(express.json())

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})



