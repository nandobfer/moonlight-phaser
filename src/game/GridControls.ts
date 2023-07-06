import { Direction } from "./Direction"
import { GridPhysics } from "./GridPhysics"

export class GridControls {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys

    constructor(private input: Phaser.Input.InputPlugin, private gridPhysics: GridPhysics) {
        this.cursors = this.input.keyboard!.createCursorKeys()
    }

    update() {
        // this.input.keyboard!.on("keydown", function (event: any) {
        //     console.log(event)
        // })
        if (this.cursors.left.isDown) {
            this.gridPhysics.movePlayer(Direction.LEFT)
        } else if (this.cursors.right.isDown) {
            this.gridPhysics.movePlayer(Direction.RIGHT)
        } else if (this.cursors.up.isDown) {
            this.gridPhysics.movePlayer(Direction.UP)
        } else if (this.cursors.down.isDown) {
            this.gridPhysics.movePlayer(Direction.DOWN)
        }
    }
}
