import Phaser from "phaser"
import { initialPlayer } from "../mocs/player"
import { Player } from "./Player"
import playerSprite from "../assets/characters.png"
import map from "../assets/map.jpg"
import map2 from "../assets/map2.jpg"
import map3 from "../assets/map3.jpg"
import map4 from "../assets/map4.png"
import { GridPhysics } from "./GridPhysics"
import { Direction } from "./Direction"
import { GridControls } from "./GridControls"
import { Socket } from "./Socket"

export default class MainScene extends Phaser.Scene {
    static readonly TILE_SIZE = 48
    private dot!: Phaser.Physics.Arcade.Sprite
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private escKey!: Phaser.Input.Keyboard.Key
    public player!: Player
    private gridControls!: GridControls
    private gridPhysics!: GridPhysics
    public ready = false
    public players: Player[]
    public socket: Socket | null = null

    constructor() {
        super("MainScene")
        this.players = []
    }

    preload() {
        this.load.spritesheet("player", playerSprite, {
            frameWidth: 26,
            frameHeight: 36,
        })
        this.load.image("map", map)
        this.load.image("map2", map2)
        this.load.image("map3", map3)
        this.load.image("map4", map4)
    }

    create() {
        const map = this.add.image(400, 300, "map4")
        // map.postFX.addPixelate(5)
        map.scale = 3

        this.cursors = this.input.keyboard!.createCursorKeys()
        this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        // this.dot = this.physics.add.sprite(400, 300, "").setCircle(10)

        const playerSprite = this.add.sprite(0, 0, "player")
        playerSprite.setDepth(2)
        playerSprite.scale = 3
        this.cameras.main.startFollow(playerSprite)
        this.cameras.main.roundPixels = true
        this.player = new Player(initialPlayer, playerSprite, new Phaser.Math.Vector2(6, 6), this)

        this.gridPhysics = new GridPhysics(this.player)
        this.gridControls = new GridControls(this.input, this.gridPhysics)

        // this.cameras.main.postFX.addPixelate(8)

        this.createPlayerAnimation(Direction.UP, 93, 95)
        this.createPlayerAnimation(Direction.RIGHT, 81, 83)
        this.createPlayerAnimation(Direction.DOWN, 57, 59)
        this.createPlayerAnimation(Direction.LEFT, 69, 71)

        this.ready = true
    }

    newPlayer(player: GamePlayer) {
        const playerSprite = this.add.sprite(0, 0, "test")
        playerSprite.setDepth(2)
        playerSprite.scale = 3
        this.players.push(new Player(player, playerSprite, new Phaser.Math.Vector2(6, 6), this))
    }

    getPlayers() {
        return this.players
    }

    connectWebSocket() {
        this.socket = new Socket(this)
    }

    private createPlayerAnimation(name: string, startFrame: number, endFrame: number) {
        this.anims.create({
            key: name,
            frames: this.anims.generateFrameNumbers("player", {
                start: startFrame,
                end: endFrame,
            }),
            frameRate: 10,
            repeat: -1,
            yoyo: true,
        })
    }

    updatePosition(newPosition: { x: number; y: number }) {}

    update(_time: number, delta: number) {
        this.socket?.ws.readyState == 1 && this.socket.syncPlayers()

        if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
            console.log("game")
            this.events.emit("gameMenu")
        }
        this.gridControls.update()
        this.gridPhysics.update(delta)
    }
}
