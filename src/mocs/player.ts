export const initialPlayer: GamePlayer = {
    id: 0,
    stats: {
        level: 1,
        health: 10,
        maxHealth: 10,
        speed: 5,
    },

    position: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    },
}
