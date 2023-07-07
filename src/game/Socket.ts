import MainScene from "./mainScene"
import { Player } from "./Player"
import { io, Socket as SocketType } from "socket.io-client"

export class Socket {
    public io: SocketType
    private game: MainScene
    private player: Player
    public ready: boolean = false

    constructor(game: MainScene) {
        this.io = io("ws://localhost:4103")
        this.game = game
        this.player = this.game.player

        this.io.on("connect", () => {
            this.io.emit("player:new", {
                player: this.player.getPlayer(),
                user: this.player.user,
            })
        })

        this.io.on("player:disconnect", (client: Client) => {
            console.log("disconnected: ", client.user.name)
            this.game.removePlayer(client.player)
        })

        this.io.on("players", (clients: Client[]) => {
            clients.map((client) => {
                this.game.newPlayer(client.player, client.user)
            })
            this.ready = true
        })

        this.io.on("player:new", (client: Client) => {
            this.game.newPlayer(client.player, client.user)
        })

        this.io.on("player:sync", (clients: Client[]) => {
            const currentPlayers = this.game.getPlayers()
            clients.map((client) => {
                const player = currentPlayers.filter((player) => player.id == client.player.id)[0]
                player?.syncPlayer(client.player)
            })
        })
    }

    syncPlayers() {
        this.io.emit("player:sync", { player: this.player.getPlayer() })
    }

    disconnect() {
        this.io.disconnect()
    }
}
