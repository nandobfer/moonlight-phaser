import { createContext, useEffect, useState } from "react"
import React from "react"
import { useGame } from "../hooks/useGame"
import { useUser } from "../hooks/useUser"
import { useCharacters } from "../hooks/useCharacters"

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
    const { characters } = useCharacters()
    const { sceneInstance } = useGame()
    const { user } = useUser()

    const [player, setPlayer] = useState<Character | undefined>(characters[0])

    useEffect(() => {
        if (sceneInstance) sceneInstance?.player?.syncReact(player!)

        console.log({ player })
    }, [player])

    useEffect(() => {
        if (user && sceneInstance) {
            sceneInstance.player!.user = user
            console.log("called game websocket connection")
            sceneInstance.connectWebSocket()
        }
    }, [user, sceneInstance])

    return <PlayerContextContext.Provider value={{ player, setPlayer }}>{children}</PlayerContextContext.Provider>
}
