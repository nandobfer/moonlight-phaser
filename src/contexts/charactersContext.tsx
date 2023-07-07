import { createContext, useState } from "react"
import React from "react"

interface CharactersContextValue {}

interface CharactersProviderProps {
    children: React.ReactNode
}

const CharactersContext = createContext<CharactersContextValue>({} as CharactersContextValue)

export default CharactersContext

export const CharactersProvider: React.FC<CharactersProviderProps> = ({ children }) => {
    return <CharactersContext.Provider value={{}}>{children}</CharactersContext.Provider>
}
