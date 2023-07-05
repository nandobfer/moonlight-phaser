import { useContext } from "react"
import GameContext from "../contexts/gameContext"

export const useGame = () => {
    const gameContext = useContext(GameContext)
    const game = gameContext.gameInstance.current
    const scene = gameContext.sceneInstance.current

    return { ...gameContext, game, scene }
}
