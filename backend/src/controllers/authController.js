
import Session from "../models/Session.js"
import { signInService, signUpService } from "../services/authService.js"
import jwt from "jsonwebtoken"


export const signUp = async (req, res) => {
    try {
        const resData = await signUpService(req.body)
        return res.status(200).json(resData)
    } catch (error) {
        console.log("Error API SignUp: ", error)
        return res.status(500).json({
            Ec: 1,
            Mes: "A server error has occurred."
        })
    }
}

export const signIn = async (req, res) => {
    try {
        const resData = await signInService(req.body)
        if (resData.Ec !== 0) 
            return res.status(200).json(resData)

        res.cookie('refreshToken', resData.refreshToken, {
            httpOnly: true,
            secure: true,
            samSite: "strict",
            maxAge: 14 * 24 * 60 * 60 * 1000
        }) 

        return res.status(200).json({
            Ec: 0,
            Mes: resData.Mes,
            accessToken: resData.accessToken
        })
    } catch (error) {
        console.log("Error API SignIn: ", error)
        return res.status(500).json({
            Ec: 1,
            Mes: "A server error has occurred."
        })
    }
}

export const signOut = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken
        if (refreshToken) {
            await Session.deleteOne({ refreshToken: refreshToken})  
            res.clearCookie("refreshToken")
        }

        return res.sendStatus(204)
    } catch (error) {
        console.log("Error API SignOut: ", error)
        return res.status(500).json({
            Ec: 1,
            Mes: "A server error has occurred."
        })
    }
}

// tao access token moi tu refresh token 
export const refreshToken = async (req, res) => {
    try {
        // lay refresh token tu cookie
        const token = req.cookies?.refreshToken
        if (!token) {
            return res.status(401).json({
                Mes: "The token does not exist."
            })
        }
        // so sanh voi refreshToken trong DB
        const session = await Session.findOne({ refreshToken: token })
        if (!session) {
            return res.status(403).json({
                Mes: "Invalid or expired token."
            })
        }
        // kiem tra refresh token da het han chua 
        if (session.expiresAt < new Date()) {
            return res.status(403).json({
                Mes: "Expired token."
            })
        }
        // tao access token moi 
        const accessToken = jwt.sign(
            { userId: session.userId},
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.ACCESS_TOKEN_TTL }
        )
        return res.status(200).json({
            accessToken
        })
    } catch (error) {
        console.error("Error create refreshToken: ", error)
        return res.status(500).json({
            Mes: "A server error has occurred."
        })
    }
}
