import { useContext } from "react"
import GameContext from "../contexts/gameContext"

export const useGame = () => {
    const gameContext = useContext(GameContext)
    const game = gameContext.gameInstance
    const scene = gameContext.sceneInstance

    return { ...gameContext, game, scene }
}
