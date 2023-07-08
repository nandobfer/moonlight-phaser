import { useContext } from "react"
import CharactersContext from "../contexts/charactersContext"
import { useLocalStorage } from "./useLocalStorage"

export const useCharacters = () => {
    const { set } = useLocalStorage()
    const charactersContext = useContext(CharactersContext)

    return { ...charactersContext }
}
