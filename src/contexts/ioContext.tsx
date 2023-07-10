import { createContext, useEffect, useState } from "react"
import React from "react"
import { socket } from "../io"
import { Socket } from "socket.io-client"

interface IoContextValue {
    io: Socket
    rooms: Room[]
    room: Room | undefined
    setRoom: (room: Room | undefined) => void
}

interface IoProviderProps {
    children: React.ReactNode
}

const IoContext = createContext<IoContextValue>({} as IoContextValue)

export default IoContext

export const IoProvider: React.FC<IoProviderProps> = ({ children }) => {
    const io = socket

    const [rooms, setRooms] = useState<Room[]>([])
    const [room, setRoom] = useState<Room>()

    io.on("rooms", (rooms: Room[]) => {
        setRooms(rooms)
    })

    io.on("room:new:complete", (room: Room) => {
        console.log({ room })
        setRoom(room)
        setRooms([...rooms, room])
    })

    useEffect(() => {
        console.log(rooms)
    }, [rooms])

    return <IoContext.Provider value={{ io, rooms, room, setRoom }}>{children}</IoContext.Provider>
}
