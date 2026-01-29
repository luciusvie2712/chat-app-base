import type { User } from "./user.ts"

export interface ResponseServer {
    Ec: number,
    Mes: string,
}
export interface AuthState {
    accessToken: string | null,
    user: User | null,
    loading: boolean
    setAccessToken: (accessToken: string) => void
    clearState: () => void

    signup: (username: string, password: string, email: string, firstname: string, lastname: string) => Promise<ResponseServer>
    
    signin: (username: string, password: string) => Promise<ResponseServer>
    
    logout: () => Promise<void>
    
    fetchMe: () => Promise<void>

    refresh: () => Promise<void>
}