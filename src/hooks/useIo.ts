import { useContext } from "react"
import IoContext from "../contexts/ioContext"
import { useUser } from "./useUser"
import { usePlayer } from "./usePlayer"

export const useIo = () => {
    const ioContext = useContext(IoContext)
    const io = ioContext.io

    const { user } = useUser()
    const player = usePlayer()

    const rooms = {
        refresh: () => io.emit("rooms", { user, player }),
        list: ioContext.rooms,
        new: (name: string) => {
            io.emit("room:new", { name })
        },
    }

    return { ...ioContext, rooms }
}
