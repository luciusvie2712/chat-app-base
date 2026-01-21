import type { User } from "./user"

export interface ResponseServer {
    Ec: number,
    Mes: string
}
export interface AuthState {
    accessToken: string | null,
    user: User | null,
    loading: boolean
    clearState: () => void

    signup: (username: string, password: string, email: string, firstname: string, lastname: string) => Promise<ResponseServer>
    
    signin: (username: string, password: string) => Promise<ResponseServer>
    
    logout: () => Promise<void>
}