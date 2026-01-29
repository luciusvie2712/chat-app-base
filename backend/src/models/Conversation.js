import mongoose from "mongoose"

const participantSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    joinedAt: { type: Date }
}, { _id: false})

const groupSchema = new mongoose.Schema({
    name: { type: String, trim: true },
    createBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { _id: false })

const lastMessageSchema = new mongoose.Schema({
    _id: { type: String },
    content: { type: String, trim: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date }
}, { _id: false })

const conversationSchema = new mongoose.Schema({
    type: { type: String, enum: ['direct', 'group'], required: true},
    participants: { type: [participantSchema], required: true},
    group: { type: [groupSchema], required: true},
    lastMessageAt: { type: Date},
    seendBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    lastMessage: { type: lastMessageSchema, default: null },
    unreadCount: { type: Map, of: Number, default: {} }
}, {timestamps: true})

conversationSchema.index({
    "participant.userId": 1,
    lastMessageAt: -1
})

export default mongoose.model("Conversation", conversationSchema)