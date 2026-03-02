import Conversation from "../models/Conversation.js";
import Friend from "../models/Friend.js"

const pair = (a, b) => {a < b ? [a, b] : [b, a]}

export const checkFrindShip = async (res, req, next) => {
    try {
        const me = req.user._id.toString()
        const reciepentId = req.body?.reciepentId ?? null

        if (!reciepentId) {
            return res.status(400).json({
                Ec: 1,
                Mes: ""
            })
        }
        
        if (reciepentId) {
            const [userA, userB] = pair(me, reciepentId)
            const isFriend = await Friend.findOne({userA, userB})

            if (!isFriend) {
                return res.status(403).json({
                    Ec: 1,
                    Mes: ""
                })
            }
            return next()
        }

    } catch (error) {
        console.error("An a error occurred in checkFriendShipMiddleware", error)
        return res.status(500).json({
            Ec: -1,
            Mes: "An a error occurred in checkFriendShipMiddleware"
        })
    }
}