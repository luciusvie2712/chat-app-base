import { create } from "zustand"
import { toast } from 'sonner'
import type { AuthState } from "@/types/store"
import { authService } from "@/services/authService"

export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,
    clearState: () => {
        set({accessToken: null, user: null, loading: false})
    },

    signup: async (username, password, email, firstname, lastname) => {
        try {
            set({loading: true})
            const res = await authService.signup(username, password, email, firstname, lastname)
            return res
        } catch (error) {
            console.error(error)
        } finally {
            set({loading: false})
        }
    },

    signin: async (username, password) => {
        try {
            set({loading: true})
            const res = await authService.signin(username, password)
            const accessToken = res.accessToken
            set({accessToken})
            return res
            // toast.success("Login success, wellcome back")
        } catch (error) {
            console.error(error)
            toast.error("Login failed.")
        } finally {
            set({loading: false})
        }
    },

    logout: async () => {
        try {
            get().clearState()
            await authService.logout()
            toast.success("Account logged out successfully.")
        } catch (error) {
            console.error(error)
            toast.error("LogOut failed.")
        }
    }
}))