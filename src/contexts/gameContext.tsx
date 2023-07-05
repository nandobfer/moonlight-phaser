import { createContext, useRef, useState } from "react"
import React from "react"
import MainScene from "../game/mainScene"

interface GameContextValue {
    gameInstance: React.MutableRefObject<Phaser.Game | undefined>
    sceneInstance: React.MutableRefObject<MainScene | undefined>
}

interface GameProviderProps {
    children: React.ReactNode
}

const GameContext = createContext<GameContextValue>({} as GameContextValue)

export default GameContext

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const gameInstance = useRef<Phaser.Game>()
    const sceneInstance = useRef<MainScene>()

    return <GameContext.Provider value={{ gameInstance, sceneInstance }}>{children}</GameContext.Provider>
}
