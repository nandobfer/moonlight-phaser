import Phaser from "phaser"
import { Player } from "./Player"
import playerSprite from "../assets/characters.png"
import { GridPhysics } from "./GridPhysics"
import { Direction } from "./Direction"
import { GridControls } from "./GridControls"

export default class MainScene extends Phaser.Scene {
    static readonly TILE_SIZE = 48
    private dot!: Phaser.Physics.Arcade.Sprite
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private escKey!: Phaser.Input.Keyboard.Key
    public player!: Player
    private gridControls!: GridControls
    private gridPhysics!: GridPhysics

    constructor() {
        super("MainScene")
    }

    preload() {
        this.load.spritesheet("player", playerSprite, {
            frameWidth: 26,
            frameHeight: 36,
        })
    }

    create() {
        this.cursors = this.input.keyboard!.createCursorKeys()
        this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        this.dot = this.physics.add.sprite(400, 300, "").setCircle(10)

        const playerSprite = this.add.sprite(0, 0, "player")
        playerSprite.setDepth(2)
        playerSprite.scale = 1
        this.cameras.main.startFollow(playerSprite)
        this.cameras.main.roundPixels = true
        this.player = new Player(playerSprite, new Phaser.Math.Vector2(6, 6), this)

        this.gridPhysics = new GridPhysics(this.player)
        this.gridControls = new GridControls(this.input, this.gridPhysics)
    }

    updateSpeed(newSpeed: number) {
        this.player.speed = newSpeed
    }

    updatePosition(newPosition: { x: number; y: number }) {}

    update(_time: number, delta: number) {
        if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
            console.log("game")
            this.events.emit("gameMenu")
        }
        this.gridControls.update()
        this.gridPhysics.update(delta)
    }
}
