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
    setLevel: (id: number) => void
    setSpeed: (speed: number) => void
    setHealth: (health: number) => void
    setMaxHealth: (maxHealth: number) => void
    setPosition: (position: { x: number; y: number }) => void
}
