import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    hashedPassword: { type: String, required: true },
    displayName: { type: String, trim: true},
    avatarUrl: { type: String },
    avatarId: { type: String }, // Cloudinary public_id de xoa hinh
    bio: { type: String, maxlength: 500 },
    phone: { type: String, spare: true } // cho phep de trong, nhung khong duoc trung
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User