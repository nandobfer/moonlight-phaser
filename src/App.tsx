import React, { useContext, useEffect, useRef } from "react"
import Phaser from "phaser"
import MainScene from "./game/mainScene"
import { usePlayer } from "./hooks/usePlayer"
import { Box, Button } from "@mui/material"
import { Status } from "./components/Status"
import { ContextUi } from "./components/ContextUi"
import "./sass/all.scss"

const App: React.FC = () => {
    const player = usePlayer()
    const gameInstance = useRef<Phaser.Game>()
    const sceneInstance = useRef<MainScene>()

    useEffect(() => {
        if (!gameInstance.current) {
            const config: Phaser.Types.Core.GameConfig = {
                type: Phaser.AUTO,
                width: window.innerWidth,
                height: window.innerHeight,
                parent: "game-container",
                physics: {
                    default: "arcade",
                },
                // backgroundColor: "#2494C2",
                scene: {
                    create: function () {
                        sceneInstance.current = new MainScene()
                        this.scene.add("MainScene", sceneInstance.current, true)
                    },
                },
            }
            gameInstance.current = new Phaser.Game(config)
        }

        if (sceneInstance.current) {
            sceneInstance.current.updateSpeed(player.speed)
            sceneInstance.current.updatePosition(player.position)
        }
    }, [player])

    return (
        <Box sx={{ position: "relative" }}>
            <Box
                sx={{ position: "absolute", width: window.innerWidth, height: window.innerHeight, border: "1px solid red" }}
            >
                <Status />
                <ContextUi />
            </Box>
            <Box
                id="game-container"
                sx={{
                    width: window.innerWidth,
                    height: window.innerHeight,
                }}
            />
        </Box>
    )
}

export default App
