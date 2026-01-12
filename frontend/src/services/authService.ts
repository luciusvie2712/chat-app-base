import api from "@/lib/axios"

export const authService = {
    register: async(username: string, password: string, email: string, firstname: string, lastname: string) => {
        const res = await api.post("/auth/signup", {username, password, email, firstname, lastname}, {withCredentials: true})
        return res.data
    },

    login: async(username: string, password: string) => {
        const res = await api.post("/auth/signin", {username, password}, {withCredentials: true})
        return res.data
    }

}