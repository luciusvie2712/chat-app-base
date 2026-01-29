import { useAuthStore } from '@/stores/useAuthStore'
import axios from 'axios'
import { config } from 'zod'

const api = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:8000/api" : "/api",
    withCredentials: true
})

// gan access token vao req header
api.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState()

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

export default api