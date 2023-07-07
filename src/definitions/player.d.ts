declare interface Character {
    id: number
    stats: Stats
}

declare interface GamePlayer extends Character {
    position: {
        x: number
        y: number
    }
}

declare interface ReactPlayer extends GamePlayer {
    setId: (id: number) => void
    setStats: (stats: Stats) => void
    setPosition: (position: { x: number; y: number }) => void
}
