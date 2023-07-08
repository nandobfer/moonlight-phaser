import { useCharacters } from "./useCharacters"
import { usePlayer } from "./usePlayer"

export const useReset = () => {
    const { setCharacters } = useCharacters()
    const { setPlayer } = usePlayer()

    const reset = () => {
        setCharacters([])
        setPlayer(undefined)
    }

    return reset
}
