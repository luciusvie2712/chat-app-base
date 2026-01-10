import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protectedMiddleware = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    // neu khong tim thay token
    if (!token)
        return res.status(401).json({
            Ec: -1,
            Mes: "No access token found."
        })

    // neu co token -> xac nhan token co hop le hay khong 
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedUser) => {
        if (err)
            return res.status(403).json({
                Ec: -1,
                Mes: "The token has expired or does not exist."
            })

        // tim thong tin user
        const user = await User.findById(decodedUser.userId).select("-hashpassword")
        if (!user) return res.status(404).json({
            Ec: -1,
            Mes: "User information not found."
        })

        req.user = user
        next()
    })

    

}