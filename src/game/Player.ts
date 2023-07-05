import { initialPlayer } from "../mocs/player"
import MainScene from "./mainScene"

export class Player {
    public speed: number = initialPlayer.speed
    public maxHealth: number = initialPlayer.maxHealth
    public health: number = initialPlayer.health
    public position: object = initialPlayer.position

    constructor(private sprite: Phaser.GameObjects.Sprite, private tilePos: Phaser.Math.Vector2, private scene: MainScene) {
        const offsetX = MainScene.TILE_SIZE / 2
        const offsetY = MainScene.TILE_SIZE

        this.sprite.setOrigin(0.5, 1)
        this.sprite.setPosition(tilePos.x * MainScene.TILE_SIZE + offsetX, tilePos.y * MainScene.TILE_SIZE + offsetY)
        this.sprite.setFrame(55)
    }

    getPosition(): Phaser.Math.Vector2 {
        return this.sprite.getBottomCenter()
    }

    setPosition(position: Phaser.Math.Vector2): void {
        this.sprite.setPosition(position.x, position.y)
        this.scene.events.emit("setPosition", { x: position.x, y: position.y })
    }
}
