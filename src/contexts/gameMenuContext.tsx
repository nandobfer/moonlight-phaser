import { createContext, useEffect, useState } from "react"
import React from "react"

interface GameMenuContextValue {
    open: boolean
    setOpen: (value: boolean) => void
}

interface GameMenuProviderProps {
    children: React.ReactNode
}

const GameMenuContext = createContext<GameMenuContextValue>({} as GameMenuContextValue)

export default GameMenuContext

export const GameMenuProvider: React.FC<GameMenuProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        console.log({ gameMenu: open })
    }, [open])

    return <GameMenuContext.Provider value={{ open, setOpen }}>{children}</GameMenuContext.Provider>
}
