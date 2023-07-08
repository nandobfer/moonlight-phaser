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
    private regenInterval: NodeJS.Timer

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
        this.sprite.setFrame(0)
        this.regenInterval = setInterval(() => this.regenerate(), 1000)
    }

    stopAnimation() {
        if (this.sprite.anims.currentAnim) {
            const standingFrame = this.sprite.anims.currentAnim.frames[0].frame.name
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
        console.log(this.stats.life)
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
        clearInterval(this.regenInterval)
        this.sprite.destroy()
    }

    statRegen(_stat: "life" | "mana" | "stamina" | "rage") {
        const stat = this.stats[_stat]
        const regen = this.stats.regeneration[_stat]
        if (stat.current < stat.max || stat.current > 0) {
            if (stat.current + regen > stat.max) {
                stat.current = stat.max
            } else {
                if (stat.current + regen < 0) {
                    stat.current = 0
                } else {
                    stat.current += regen
                }
            }
        }
    }

    regenerate() {
        Object.entries(this.stats.regeneration).map(([key, value]) =>
            this.statRegen(key as "life" | "mana" | "stamina" | "rage")
        )
        this.scene.events.emit("regeneration", this.stats)
    }
}
