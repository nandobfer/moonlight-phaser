import { Direction } from "./Direction"
import MainScene from "./mainScene"

export class Player {
    public id: number
    public spriteId: number
    public name: string
    public stats: Stats
    public attributes: Attributes
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
        this.name = player.name
        this.spriteId = player.sprite
        this.attributes = player.attributes
        this.stats = player.stats

        this.position = player.position

        this.sprite.setOrigin(0.5, 1)
        this.sprite.setPosition(
            player.position.x * MainScene.TILE_SIZE + offsetX,
            player.position.y * MainScene.TILE_SIZE + offsetY
        )
        this.sprite.setFrame(1)
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

    getPosition(): Phaser.Math.Vector2 {
        return this.sprite.getBottomCenter()
    }

    setPosition(position: Phaser.Math.Vector2): void {
        this.sprite.setPosition(position.x, position.y)
        this.scene.events.emit("setPosition", { x: position.x, y: position.y })
    }

    syncReact(player: Character): void {
        this.stats = player.stats
        this.attributes = player.attributes
        this.sprite.setPosition(player.position.x, player.position.y)
    }

    getPlayer() {
        const player: GamePlayer = {
            id: this.id,
            sprite: this.spriteId,
            name: this.name,
            attributes: this.attributes,
            stats: this.stats,
            position: {
                x: this.getPosition().x,
                y: this.getPosition().y,
            },
        }

        return player
    }

    syncPlayer(player: GamePlayer) {
        this.stats = player.stats
        this.attributes = player.attributes
        this.position = player.position
        this.sprite.setPosition(player.position.x, player.position.y)
    }

    destroy() {
        this.sprite.destroy()
    }
}
