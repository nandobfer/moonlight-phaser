import MainScene from "./mainScene"
import { Player } from "./Player"
import { io, Socket as SocketType } from "socket.io-client"

export class Socket {
    public io: SocketType
    private game: MainScene
    private player: Player
    public ready: boolean = false

    constructor(game: MainScene) {
        this.io = io("wss://app.agenciaboz.com.br:4103")
        this.game = game
        this.player = this.game.player!

        this.io.on("connect", () => {
            this.io.emit("player:new", this.getClient())
        })

        this.io.on("player:disconnect", (client: Client) => {
            console.log("disconnected: ", client.user.name)

            const player = this.game.getPlayer(client.user.id)
            this.game.players = this.game.players.filter((item) => item.user!.id != client.user.id)
            player.destroy()
        })

        this.io.on("players", (clients: Client[]) => {
            clients.map((client) => {
                this.game.newEntity(client.player, client.user)
            })
            this.ready = true
        })

        this.io.on("player:new", (client: Client) => {
            this.game.newEntity(client.player, client.user)
        })

        this.io.on("player:sync", (clients: Client[]) => {
            clients.map((client) => {
                const player = this.game.getPlayer(client.user.id)
                player?.syncPlayer(client.player)
            })
        })
    }

    syncPlayers() {
        this.io.emit("player:sync", this.getClient())
    }

    disconnect() {
        this.io.disconnect()
    }

    getClient() {
        return { player: this.player.getPlayer(), user: this.player.user! }
    }
}
