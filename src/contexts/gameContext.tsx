import { createContext, useEffect, useRef, useState } from "react"
import React from "react"
import MainScene from "../game/mainScene"

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

    // const gameInstance = useRef<Phaser.Game>()
    // const sceneInstance = useRef<MainScene>()

    useEffect(() => {
        if (gameInstance) {
            setSceneInstance(gameInstance.scene.keys.MainScene as MainScene)
        } else {
            setSceneInstance(undefined)
        }
    }, [gameInstance])

    return (
        <GameContext.Provider value={{ gameInstance, sceneInstance, setGameInstance, setSceneInstance }}>
            {children}
        </GameContext.Provider>
    )
}
