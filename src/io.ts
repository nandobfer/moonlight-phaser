import { io, Socket as SocketType } from "socket.io-client"

export const socket = io("ws://localhost:4103")
// export const socket = io("wss://app.agenciaboz.com.br:4103")
