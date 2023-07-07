declare interface Character {
    id: number
    name: string
    sprite: number
    stats: Stats

    attributes: Attributes

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
