import Conversation from "../models/Conversation.js"
import Message from "../models/Message.js"
import { updateConversationAfterCreateMessage } from "../utils/messageHelper.js"

export const sendDirectMessageService = async (reciepentId, content, conversationId, senderId) => {
    try {
        let conversation

        if (conversationId) {
            conversation = await Conversation.findById(conversationId)
        }
        if (!conversationId) {
            conversation = await Conversation.create({
                type: 'direct',
                participants: [
                    { userId: senderId, joinedAt: new Date() },
                    { userId: reciepentId, joinedAt: new Date() }
                ],
                lastMessageAt: new Date(),
                unreadCount: new Map()
            })
        }

        const message = await Message.create({
            conversationId: conversation._id,
            senderId,
            content,
            imgUrl
        })
        
        updateConversationAfterCreateMessage(conversation, message, senderId)
        await Conversation.save()

        return {
            Ec: 0,
            Mes: "",
            message
        }
    } catch (error) {
        console.error("An error occurred in sendDirectMessageService", error)
        return {
            Ec: -1,
            Mes: "An error occurred in sendDirectMessageService"
        }
    }
}

export const sendGroupMessageService = async () => {
    try {
        
    } catch (error) {
        
    }
}