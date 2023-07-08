import { createContext, useEffect, useState } from "react"
import React from "react"
import { useGame } from "../hooks/useGame"
import { useUser } from "../hooks/useUser"
import { useCharacters } from "../hooks/useCharacters"
import { useAttributesMods } from "../hooks/useAttributesMods"

interface PlayerContextContextValue {
    player: Character | undefined
    setPlayer: (player: Character | undefined) => void
    updateGame: boolean
    setUpdateGame: (value: boolean) => void
}

interface PlayerContextProviderProps {
    children: React.ReactNode
}

const PlayerContextContext = createContext<PlayerContextContextValue>({} as PlayerContextContextValue)

export default PlayerContextContext

export const PlayerContextProvider: React.FC<PlayerContextProviderProps> = ({ children }) => {
    const applyAttributes = useAttributesMods()

    const { characters } = useCharacters()
    const { sceneInstance } = useGame()
    const { user } = useUser()

    const [player, setPlayer] = useState<Character | undefined>(characters[0])
    const [updateGame, setUpdateGame] = useState(false)

    useEffect(() => {
        if (player?.stats) {
            setPlayer({ ...player, stats: applyAttributes(player) })
        }
    }, [player?.attributes])

    useEffect(() => {
        if (sceneInstance && updateGame && player) {
            sceneInstance.player?.syncReact(player)
            setUpdateGame(false)
        }
    }, [updateGame])

    useEffect(() => {
        if (user && sceneInstance) {
            if (!sceneInstance.player) {
                const interval = setInterval(() => {
                    if (sceneInstance.player) {
                        sceneInstance.player.user = user
                        console.log("called game websocket connection")
                        sceneInstance.connectWebSocket()

                        clearInterval(interval)
                    }
                }, 500)

                return () => clearInterval(interval)
            }
        }
    }, [user, sceneInstance])

    return (
        <PlayerContextContext.Provider value={{ player, setPlayer, updateGame, setUpdateGame }}>
            {children}
        </PlayerContextContext.Provider>
    )
}
