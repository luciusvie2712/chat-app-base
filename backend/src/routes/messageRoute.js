import express from "express"
import { sendDirectMessage, sendGroupMessage } from "../controllers/messageController"
import { checkFrindShip } from "../middlewares/friendMiddleware"
const router = express.Router()

router.post('/direct', checkFrindShip, sendDirectMessage)
router.post('/group', sendGroupMessage)

export default router 