import ButtonLogout from "@/components/auth/button-logout"
import { useAuthStore } from "@/stores/useAuthStore"

const ChatAppPage = () => {
    const { accessToken, user } = useAuthStore()
    console.log(user, accessToken)
    return (
        <>
            Wellcome to {user?.displayName}
            <ButtonLogout />
        </>
    )
}

export default ChatAppPage