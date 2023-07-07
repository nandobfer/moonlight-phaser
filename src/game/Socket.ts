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
        this.player = this.game.player!

        this.io.on("connect", () => {
            this.io.emit("player:new", {
                player: this.player.getPlayer(),
                user: this.player.user,
            })
        })

        this.io.on("player:disconnect", (client: Client) => {
            console.log("disconnected: ", client.user.name)

            const player = this.game.getPlayer(client.player.id)
            this.game.players = this.game.players.filter((item) => item.id != client.player.id)
            player.destroy()
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
            clients.map((client) => {
                const player = this.game.getPlayer(client.player.id)
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
