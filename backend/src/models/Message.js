import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, trim: true },
    imgUrl: { type: String }
}, { timestamps: true })

messageSchema.index({ conversationId: 1, createdAt: -1 })

export default mongoose.model("Message", messageSchema)