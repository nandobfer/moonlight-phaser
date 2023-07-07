import { Direction } from "./Direction"
import { Player } from "./Player"
import MainScene from "./mainScene"

const Vector2 = Phaser.Math.Vector2
type Vector2 = Phaser.Math.Vector2

export class GridPhysics {
    private movementDirection: Direction = Direction.NONE
    private readonly speedPixelsPerSecond: number = MainScene.TILE_SIZE
    private movementDirectionVectors: {
        [key in Direction]?: Vector2
    } = {
        [Direction.UP]: Vector2.UP,
        [Direction.DOWN]: Vector2.DOWN,
        [Direction.LEFT]: Vector2.LEFT,
        [Direction.RIGHT]: Vector2.RIGHT,
    }
    private tileSizePixelsWalked: number = 0
    private lastMovementIntent = Direction.NONE

    constructor(private player: Player) {}

    movePlayer(direction: Direction): void {
        this.lastMovementIntent = direction
        if (!this.isMoving()) {
            this.startMoving(direction)
        }
    }

    private isMoving(): boolean {
        return this.movementDirection != Direction.NONE
    }

    private startMoving(direction: Direction): void {
        this.player.startAnimation(direction)
        this.movementDirection = direction
    }

    update(delta: number) {
        if (this.isMoving()) {
            this.updatePlayerPosition(delta)
        }
        this.lastMovementIntent = Direction.NONE
    }

    private updatePlayerPosition(delta: number) {
        const pixelsToWalkThisUpdate = this.getPixelsToWalkThisUpdate(delta)
        if (this.willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate) && !this.shouldContinueMoving()) {
            this.movePlayerSprite(MainScene.TILE_SIZE - this.tileSizePixelsWalked)
            this.stopMoving()
        } else {
            this.movePlayerSprite(pixelsToWalkThisUpdate)
        }
    }

    private shouldContinueMoving(): boolean {
        return this.movementDirection == this.lastMovementIntent
    }

    private movePlayerSprite(pixelsToMove: number) {
        const directionVec = this.movementDirectionVectors[this.movementDirection]!.clone()
        const movementDistance = directionVec.multiply(new Vector2(pixelsToMove))
        const newPlayerPos = this.player.getPosition().add(movementDistance)
        this.player.setPosition(newPlayerPos)
        this.tileSizePixelsWalked += pixelsToMove
        this.tileSizePixelsWalked %= MainScene.TILE_SIZE
    }

    private getPixelsToWalkThisUpdate(delta: number): number {
        const deltaInSeconds = delta / 1000
        return this.speedPixelsPerSecond * deltaInSeconds * this.player.stats.speed
    }

    private stopMoving(): void {
        this.player.stopAnimation();
        this.movementDirection = Direction.NONE
    }

    private willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate: number): boolean {
        return this.tileSizePixelsWalked + pixelsToWalkThisUpdate >= MainScene.TILE_SIZE
    }
}
