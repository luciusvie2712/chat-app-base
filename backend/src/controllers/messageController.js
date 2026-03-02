import { sendDirectMessageService } from "../services/messageService"

export const sendDirectMessage = async (req, res) => {
    try {
        const {reciepentId, content, conversationId} = req.body
        const senderId = req.user._id
        const resData = await sendDirectMessageService(reciepentId, content, conversationId, senderId)
        if (resData.Ec === 0) {
            return res.status(200).json({
                Ec: 0,
                Mes: resData.Mes,
                data: resData.message
            })
        } else {
            return res.status(403).json({
                Ec: -1,
                Mes: "An error occurred while sending the message."
            })
        }
    } catch (error) {
        console.error("An error occurred while sending the message.")
        return res.status(500).json({
            Ec: -1,
            Mes: "System error"
        })
    }
}

export const sendGroupMessage = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("An error occurred while sending the message.")
        return res.status(500).json({
            Ec: -1,
            Mes: "System error"
        })
    }
}