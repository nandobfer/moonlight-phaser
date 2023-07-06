import { createContext, useEffect, useState } from "react"
import React from "react"
import { initialPlayer } from "../mocs/player"
import { useGame } from "../hooks/useGame"
import { useUser } from "../hooks/useUser"

interface PlayerContextContextValue {
    player: ReactPlayer
}

interface PlayerContextProviderProps {
    children: React.ReactNode
}

const PlayerContextContext = createContext<PlayerContextContextValue>({} as PlayerContextContextValue)

export default PlayerContextContext

export const PlayerContextProvider: React.FC<PlayerContextProviderProps> = ({ children }) => {
    // const websocket = useWebsocket()

    const { sceneInstance } = useGame()
    const { user } = useUser()

    const [id, setId] = useState(initialPlayer.id)
    const [speed, setSpeed] = useState<number>(initialPlayer.speed)
    const [maxHealth, setMaxHealth] = useState(initialPlayer.maxHealth)
    const [health, setHealth] = useState(maxHealth)
    const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

    const player: ReactPlayer = {
        id,
        setId,
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
        sceneInstance?.player.syncReact(player)

        // console.log({ sceneInstance, user })
        // if (user && sceneInstance && websocket.ready && player) {
        //     const interval = setInterval(() => websocket.send({ syncPlayers: true, player, user }), 500)

        //     return () => clearInterval(interval)
        // }
        // if (websocket.readyState)
    }, [player])

    useEffect(() => {
        if (user && sceneInstance) {
            setId(user.id)
            sceneInstance.player.id = user.id
            sceneInstance.player.user = user
            console.log("called game websocket connection")
            sceneInstance.connectWebSocket()
        }
    }, [user, sceneInstance])

    return <PlayerContextContext.Provider value={{ player }}>{children}</PlayerContextContext.Provider>
}
