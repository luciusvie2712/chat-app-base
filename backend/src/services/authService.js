import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from 'crypto'
import Session from "../models/Session.js"

const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000

export const signUpService = async (dataInput) => {
    try {
        const { username, email, password, firstname, lastname } = dataInput
        if ( !username || !email || !password || !firstname || !lastname ) 
            return {
                Ec: -1,
                Mes: "The registration information is incomplete."
            }
        
        const usernameExist = await User.findOne({username})
        if (usernameExist) return {
            Ec: -1,
            Mes: "Your username already in use."
        }

        const emailExist = await User.findOne({email})
        if (emailExist) return {
            Ec: -1,
            Mes: "Your email address has already in registered."
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            username, 
            email, 
            hashedPassword,
            displayName: `${firstname} ${lastname}`
        })
            
        return {
            Ec: 0,
            Mes: "Account user registered successfully"
        }
    } catch (error) {
        return {
            Ec: 1,
            Mes: "Error Sign Up Service"
        }
    }
}

export const signInService = async (dataInput) => {
    try {
        const { username, password } = dataInput

        if ( !username || !password ) 
            return {
                Ec: -1,
                Mes: "The login information is incomplete."
            }

        const user = await User.findOne({ username })
        if (!user)
            return {
                Ec: -1, 
                Mes: "The user does not exist or the username/password is incorrect."
            }

        const passwordIsMatch = await bcrypt.compare(password, user.hashedPassword)
        if (!passwordIsMatch)
            return {
                Ec: -1,
                Mes: "The user does not exist or the username/password is incorrect."
            }

        const accessToken = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.ACCESS_TOKEN_TTL}
        )
        // tao refresh token
        const refreshToken = crypto.randomBytes(64).toString('hex')

        // tao session moi -> luu refresh token 
        await Session.create({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL)
        })
        return {
            Ec: 0,
            Mes: "Login successful",
            refreshToken,
            accessToken
        }
    } catch (error) {
        return {
            Ec: 1,
            Mes: "Error Sign In Service"
        }
    }
}