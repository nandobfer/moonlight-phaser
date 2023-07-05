declare interface Player {
    speed: number
    setSpeed: (speed: number) => void
    health: number
    setHealth: (health: number) => void
    maxHealth: number
    setMaxHealth: (maxHealth: number) => void

    position: {
        x: number
        y: number
    }
    setPosition: (position: { x: number; y: number }) => void
}

declare interface ReactPlayer extends Player {}
