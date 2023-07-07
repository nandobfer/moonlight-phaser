declare interface Character {
    id: number
    stats: Stats
    position: {
        x: number
        y: number
    }
}

declare interface GamePlayer extends Character {}

declare interface ReactPlayer extends GamePlayer {
    setId: (id: number) => void
    setStats: (stats: Stats) => void
    setPosition: (position: { x: number; y: number }) => void
}
