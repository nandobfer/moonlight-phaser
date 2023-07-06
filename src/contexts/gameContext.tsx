import { createContext, useEffect, useMemo, useRef, useState } from "react"
import React from "react"
import MainScene from "../game/mainScene"
import { useUser } from "../hooks/useUser"

interface GameContextValue {
    gameInstance: Phaser.Game | undefined
    sceneInstance: MainScene | undefined
    setGameInstance: React.Dispatch<React.SetStateAction<Phaser.Game | undefined>>
    setSceneInstance: React.Dispatch<React.SetStateAction<MainScene | undefined>>
}

interface GameProviderProps {
    children: React.ReactNode
}

const GameContext = createContext<GameContextValue>({} as GameContextValue)

export default GameContext

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [gameInstance, setGameInstance] = useState<Phaser.Game>()
    const [sceneInstance, setSceneInstance] = useState<MainScene>()

    useEffect(() => {
        if (gameInstance) {
            const interval = setInterval(() => {
                gameInstance?.scene.keys.MainScene && setSceneInstance(gameInstance?.scene.keys.MainScene as MainScene)
            }, 500)

            return () => clearInterval(interval)
        }
    }, [gameInstance])

    // useEffect(() => {
    //     console.log({ sceneInstance })
    // }, [sceneInstance])

    return (
        <GameContext.Provider value={{ gameInstance, sceneInstance, setGameInstance, setSceneInstance }}>
            {children}
        </GameContext.Provider>
    )
}
