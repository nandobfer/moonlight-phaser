declare interface GamePlayer {
    id: number
    speed: number
    health: number
    maxHealth: number

    position: {
        x: number
        y: number
    }
}

declare interface ReactPlayer extends GamePlayer {
    setId: (id: number) => void
    setSpeed: (speed: number) => void
    setHealth: (health: number) => void
    setMaxHealth: (maxHealth: number) => void
    setPosition: (position: { x: number; y: number }) => void
}
