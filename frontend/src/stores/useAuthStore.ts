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
            await get().fetchMe()
            return res
        } catch (error) {
            console.error(error)
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
    },

    fetchMe: async () => {
        try {
            set({loading: true})
            const user = await authService.fetchMe()
            if (user.Ec === 0) {
                set({user: user.data})
            } else {
                set({ user: null, accessToken: null})
                toast.error("An error occurred while retrieving user data. Please try again.")
            }
        } catch (error) {
            console.error(error)
            set({ user: null, accessToken: null})
            toast.error("An error occurred while retrieving user data. Please try again.")
        } finally {
            set({loading: false})
        }
    }
}))