import { useContext } from "react"
import PlayerContext from "../contexts/playerContext"

export const usePlayer = () => {
    const playerContext = useContext(PlayerContext)

    const player = playerContext.player
    const setPlayer = playerContext.setPlayer


    const setPosition = (value: { x: number; y: number }) => {
        setPlayer({ ...player!, position: value })
    }

    const updateGame = () => {
        playerContext.setUpdateGame(true)
    }

    const handleRegeneration = (stats: Stats) => {
        setPlayer({ ...player!, stats })
    }

    return { ...playerContext.player, setPosition, setPlayer, updateGame, handleRegeneration }
}
