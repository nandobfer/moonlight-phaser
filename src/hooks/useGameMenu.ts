import { useContext } from "react"
import GameMenuContext from "../contexts/gameMenuContext"

export const useGameMenu = () => {
    const gameMenuContext = useContext(GameMenuContext)

    return { ...gameMenuContext }
}
