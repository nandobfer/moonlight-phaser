import { createContext, useEffect, useState } from "react"
import React from "react"
import { initialPlayer } from "../mocs/player"
import { useGame } from "../hooks/useGame"
import { useUser } from "../hooks/useUser"

interface PlayerContextContextValue {
    player: Character | undefined
    setPlayer: (player: Character | undefined) => void
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

    const [player, setPlayer] = useState<Character>()

    useEffect(() => {
        if (sceneInstance) sceneInstance?.player.syncReact(player!)

        // console.log({ sceneInstance, user })
        // if (user && sceneInstance && websocket.ready && player) {
        //     const interval = setInterval(() => websocket.send({ syncPlayers: true, player, user }), 500)

        //     return () => clearInterval(interval)
        // }
        // if (websocket.readyState)
    }, [player])

    useEffect(() => {
        if (user && sceneInstance) {
            sceneInstance.player.user = user
            console.log("called game websocket connection")
            sceneInstance.connectWebSocket()
        }
    }, [user, sceneInstance])

    return <PlayerContextContext.Provider value={{ player, setPlayer }}>{children}</PlayerContextContext.Provider>
}
