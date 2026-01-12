import { create } from "zustand"
import { toast } from 'sonner'
import type { AuthState } from "@/types/store"
import { authService } from "@/services/authService"

export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    register: async (username, password, email, firstname, lastname) => {
        try {
            set({loading: true})
            await authService.register(username, password, email, firstname, lastname)

            toast.success("Register success, please login account.")
        } catch (error) {
            console.error(error)
            toast.error("Register failed.")
        }
    },

    login: async (username, password) => {
        try {
            set({loading: true})
            const accessToken = await authService.login(username, password)
            set({accessToken})

            toast.success("Login success, wellcome back")
        } catch (error) {
            console.error(error)
            toast.error("Login failed.")
        }
    }
}))