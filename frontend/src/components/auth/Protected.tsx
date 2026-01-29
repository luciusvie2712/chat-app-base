import { useAuthStore } from "@/stores/useAuthStore"
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router"

const Protected = () => {
    const { accessToken, user, loading, refresh, fetchMe } = useAuthStore()
    const [ starting, setStarting ] = useState(true)

    const init = async () => {
        if (!accessToken) {
            await refresh()
        }

        if (accessToken && !user)  {
            await fetchMe()
        }
        setStarting(false)
    }

    useEffect(() => {
        init()
    }, [])
    
    if (starting || loading) {
        return (
            <div className="flex h-screen justify-center items-center">
                Page loading...
            </div>
        )
    }

    if (!accessToken) {
        return (
            <Navigate to="/login" replace />
        )
    }
    

    return (
        <Outlet></Outlet>
    )
}

export default Protected