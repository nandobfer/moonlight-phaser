import { useContext } from "react"
import PlayerContext from "../contexts/playerContext"

export const usePlayer = () => {
    const playerContext = useContext(PlayerContext)

    const player = playerContext.player
    const setPlayer = playerContext.setPlayer

    const setHealth = (value: number) => {
        setPlayer({ ...player!, stats: { ...player!.stats, health: value } })
    }

    const setMaxHealth = (value: number) => {
        setPlayer({ ...player!, stats: { ...player!.stats, maxHealth: value } })
    }

    const setSpeed = (value: number) => {
        setPlayer({ ...player!, stats: { ...player!.stats, speed: value } })
    }

    const setLevel = (value: number) => {
        setPlayer({ ...player!, stats: { ...player!.stats, level: value } })
    }

    const setPosition = (value: { x: number; y: number }) => {
        setPlayer({ ...player!, position: value })
    }

    return { ...playerContext.player, setHealth, setMaxHealth, setSpeed, setLevel, setPosition }
}
