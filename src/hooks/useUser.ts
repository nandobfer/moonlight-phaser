import { useContext } from "react"
import UserContext from "../contexts/userContext"

export const useUser = () => {
    const userContext = useContext(UserContext)
    const user = userContext.value
    const setUser = userContext.setValue

    return { user, setUser }
}
