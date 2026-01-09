
import Session from "../models/Session.js"
import { signInService, signUpService } from "../services/authService.js"


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
            return res.status(400).json(resData)

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