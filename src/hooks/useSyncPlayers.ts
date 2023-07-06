import { useGame } from "./useGame"

export const useSyncPlayers = () => {
    const { sceneInstance } = useGame()

    const syncPlayers = (clients: Client[]) => {
        // const currentPlayers = sceneInstance?.getPlayers()
        // const currentPlayersIds = currentPlayers?.map((player) => player.id)
        // clients.map((client) => {
        //     if (!currentPlayersIds?.includes(client.user.id)) {
        //         sceneInstance?.newPlayer(client.player!)
        //     } else {
        //         const player = currentPlayers?.filter((player) => player.id == client.user.id)[0]
        //         player?.syncPlayer(client.player!)
        //     }
        // })
    }

    return syncPlayers
}
