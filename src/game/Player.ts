import { Direction } from "./Direction"
import MainScene from "./mainScene"

export class Player {
    public id: number
    public speed: number
    public maxHealth: number
    public health: number
    public position: object
    public user: User | null = null

    constructor(
        player: GamePlayer,
        private sprite: Phaser.GameObjects.Sprite,
        private tilePos: Phaser.Math.Vector2,
        private scene: MainScene
    ) {
        const offsetX = MainScene.TILE_SIZE / 2
        const offsetY = MainScene.TILE_SIZE

        this.id = player.id
        this.speed = player.speed
        this.maxHealth = player.maxHealth
        this.health = player.health
        this.position = player.position

        this.sprite.setOrigin(0.5, 1)
        this.sprite.setPosition(tilePos.x * MainScene.TILE_SIZE + offsetX, tilePos.y * MainScene.TILE_SIZE + offsetY)
        this.sprite.setFrame(58)
    }

    stopAnimation() {
        if (this.sprite.anims.currentAnim) {
            const standingFrame = this.sprite.anims.currentAnim.frames[1].frame.name
            this.sprite.anims.stop()
            this.sprite.setFrame(standingFrame)
        }
    }

    startAnimation(direction: Direction) {
        this.sprite.anims.play(direction)
    }

    syncReact(player: ReactPlayer): void {
        this.health = player.health
        this.maxHealth = player.maxHealth
        this.speed = player.speed
        this.sprite.setPosition(player.position.x, player.position.y)
    }

    getPosition(): Phaser.Math.Vector2 {
        return this.sprite.getBottomCenter()
    }

    setPosition(position: Phaser.Math.Vector2): void {
        this.sprite.setPosition(position.x, position.y)
        this.scene.events.emit("setPosition", { x: position.x, y: position.y })
    }

    getPlayer() {
        const player: GamePlayer = {
            id: this.id,
            health: this.health,
            maxHealth: this.maxHealth,
            speed: this.speed,
            position: {
                x: this.getPosition().x,
                y: this.getPosition().y,
            },
        }

        return player
    }

    syncPlayer(player: GamePlayer) {
        this.speed = player.speed
        this.maxHealth = player.maxHealth
        this.health = player.health
        this.position = player.position
        this.sprite.setPosition(player.position.x, player.position.y)
    }
}
