import { createContext, useEffect, useState } from "react"
import React from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

interface CharactersContextValue {
    characters: Character[]
    setCharacters: (characters: Character[]) => void
}

interface CharactersProviderProps {
    children: React.ReactNode
}

const CharactersContext = createContext<CharactersContextValue>({} as CharactersContextValue)

export default CharactersContext

export const CharactersProvider: React.FC<CharactersProviderProps> = ({ children }) => {
    const { get, set } = useLocalStorage()

    const [characters, setCharacters] = useState<Character[]>(get("moonlight:characters") || [])

    useEffect(() => {
        set("moonlight:characters", characters)
        console.log(characters)
    }, [characters])

    return <CharactersContext.Provider value={{ characters, setCharacters }}>{children}</CharactersContext.Provider>
}
