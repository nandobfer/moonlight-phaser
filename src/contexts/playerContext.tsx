import { createContext, useEffect, useState } from "react"
import React from "react"

interface PlayerContextContextValue {
    player: Player
}

interface PlayerContextProviderProps {
    children: React.ReactNode
}

const PlayerContextContext = createContext<PlayerContextContextValue>({} as PlayerContextContextValue)

export default PlayerContextContext

export const PlayerContextProvider: React.FC<PlayerContextProviderProps> = ({ children }) => {
    const [speed, setSpeed] = useState<number>(2)
    const [maxHealth, setMaxHealth] = useState(10)
    const [health, setHealth] = useState(maxHealth)
    const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

    const player: Player = {
        speed,
        setSpeed,
        health,
        setHealth,
        maxHealth,
        setMaxHealth,
        position,
        setPosition,
    }

    useEffect(() => {
        console.log({ player })
    }, [player])

    return <PlayerContextContext.Provider value={{ player }}>{children}</PlayerContextContext.Provider>
}
