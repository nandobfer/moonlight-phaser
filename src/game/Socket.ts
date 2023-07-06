import MainScene from "./mainScene"
import { Player } from "./Player"

export class Socket {
    public ws: WebSocket
    private game: MainScene
    private player: Player

    constructor(game: MainScene) {
        this.ws = new WebSocket(`ws://localhost:4103`)
        this.game = game
        this.player = this.game.player

        this.ws.addEventListener("open", () => {
            console.log("oi")

            this.ws.send(
                JSON.stringify({
                    connect: {
                        player: this.player.getPlayer(),
                        user: this.player.user,
                    },
                })
            )
        })

        this.ws.addEventListener("message", (message) => {
            const data = JSON.parse(message.data)

            if (data.syncPlayers) {
                const clients: Client[] = data.syncPlayers.clients

                const currentPlayers = this.game.getPlayers()
                const currentPlayersIds = currentPlayers.map((player) => player.id)

                clients.map((client) => {
                    if (!currentPlayersIds.includes(client.user.id)) {
                        this.game.newPlayer(client.player)
                    } else {
                        const player = currentPlayers.filter((player) => player.id == client.user.id)[0]
                        player.syncPlayer(client.player)
                    }
                })
            }
        })
    }

    syncPlayers() {
        this.ws.send(
            JSON.stringify({
                syncPlayers: {
                    player: this.player.getPlayer(),
                },
            })
        )
    }
}
