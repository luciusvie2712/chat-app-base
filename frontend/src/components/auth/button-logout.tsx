import { useAuthStore } from "@/stores/useAuthStore"
import { Button } from "../ui/button"
import { useNavigate } from "react-router"

const ButtonLogout = ( ) => {
    const { logout } = useAuthStore()
    const navigate = useNavigate()
    const handleLogOut = async () => {
        try {
            await logout()
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Button onClick={handleLogOut} className="hover">LogOut</Button>
    )
}

export default ButtonLogout