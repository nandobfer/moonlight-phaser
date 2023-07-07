import { useContext } from "react"
import CharactersContext from "../contexts/charactersContext"

export const useCharacters = () => {
    const charactersContext = useContext(CharactersContext)

    return { ...charactersContext }
}
