import mongoose from "mongoose"

const friendRequest = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, maxlength: 300},
}, { timestamps: true })

friendRequest.index({ from: 1, to: 1}, {unique: true})

friendRequest.index({from: 1})

friendRequest.index({to: 1})

export default mongoose.model("FriendRequest", friendRequest)