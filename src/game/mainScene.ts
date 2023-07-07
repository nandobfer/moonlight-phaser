import Phaser from "phaser"
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
import { images } from "../images"
import player1 from "../assets/sprites/characters/1/spritesheet.png"
import player2 from "../assets/sprites/characters/2/spritesheet.png"

const { sprites } = images

export default class MainScene extends Phaser.Scene {
    static readonly TILE_SIZE = 48
    private dot!: Phaser.Physics.Arcade.Sprite
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private escKey!: Phaser.Input.Keyboard.Key
    public player: Player | undefined
    private gridControls!: GridControls
    private gridPhysics!: GridPhysics
    public ready = false
    public players: Player[] = []
    public socket: Socket | null = null

    constructor() {
        super("MainScene")
    }

    preload() {
        this.load.spritesheet("player:1", player1, {
            frameWidth: 16,
            frameHeight: 32,
        })
        // this.load.spritesheet("player:2", player2, {
        //     frameWidth: 16,
        //     frameHeight: 32,
        // })

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

        // this.cameras.main.postFX.addPixelate(8)

        this.createPlayerAnimation(Direction.UP, 9, 12)
        this.createPlayerAnimation(Direction.RIGHT, 5, 8)
        this.createPlayerAnimation(Direction.DOWN, 1, 4)
        this.createPlayerAnimation(Direction.LEFT, 5, 8)

        this.ready = true

        setTimeout(() => this.events.emit("ready"), 1000)
    }

    instanciateCharacter(character: Character) {
        console.log("instanciating character")
        console.log({ character })
        const playerSprite = this.add.sprite(0, 0, `player:${character.sprite}`)
        playerSprite.setDepth(2)
        playerSprite.scale = 3

        this.player = new Player(character, playerSprite, new Phaser.Math.Vector2(6, 6), this)

        this.cameras.main.startFollow(playerSprite)
        this.cameras.main.roundPixels = true

        this.gridPhysics = new GridPhysics(this.player)
        this.gridControls = new GridControls(this.input, this.gridPhysics)
    }

    newPlayer(player: GamePlayer, user: User) {
        const playerSprite = this.add.sprite(0, 0, "test")
        playerSprite.setDepth(2)
        playerSprite.scale = 3
        const newPlayer = new Player(player, playerSprite, new Phaser.Math.Vector2(6, 6), this)
        newPlayer.id = user.id

        this.players.push(newPlayer)
    }

    getPlayers() {
        return this.players
    }

    getPlayer(id: number) {
        return this.players.filter((player) => player.id == id)[0]
    }

    connectWebSocket() {
        this.socket = new Socket(this)
    }

    private createPlayerAnimation(name: string, startFrame: number, endFrame: number) {
        this.anims.create({
            key: name,
            frames: this.anims.generateFrameNumbers(`player:${this.player?.spriteId}`, {
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
        // this.socket?.ws.readyState == 1 && this.socket.syncPlayers()
        if (this.player) {
            this.socket?.ready && this.socket.syncPlayers()

            if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
                console.log("game")
                this.events.emit("gameMenu")
            }
            this.gridControls.update()
            this.gridPhysics.update(delta)
        }
    }
}
