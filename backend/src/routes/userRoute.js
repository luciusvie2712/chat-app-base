import express, { Router } from "express"
import { getUser } from "../controllers/userController.js"
const router = express.Router()

router.get("/get-user", getUser)

export default router