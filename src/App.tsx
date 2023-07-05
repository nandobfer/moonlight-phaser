import React, { useContext, useEffect, useRef, useState } from "react"
import Phaser from "phaser"
import MainScene from "./game/mainScene"
import { usePlayer } from "./hooks/usePlayer"
import { Box, Button, ThemeProvider } from "@mui/material"
import { Status } from "./components/Status"
import { ContextUi } from "./components/ContextUi"
import "./sass/all.scss"
import { useMuiTheme } from "./hooks/useMuiTheme"

const App: React.FC = () => {
    const player = usePlayer()
    const gameInstance = useRef<Phaser.Game>()
    const sceneInstance = useRef<MainScene>()
    const muiTheme = useMuiTheme()

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
                scene: [MainScene],
            }
            gameInstance.current = new Phaser.Game(config)
        }
        if (gameInstance.current) {
            sceneInstance.current = gameInstance.current.scene.keys.MainScene as MainScene
        }
    }, [])

    useEffect(() => {
        if (sceneInstance.current) {
            sceneInstance.current.events.on("setPosition", (newPosition: { x: number; y: number }) => {
                player.setPosition(newPosition)
            })
        }

        return () => {
            if (sceneInstance.current) {
                sceneInstance.current.events.off("setPosition")
            }
        }
    }, [])

    return (
        <ThemeProvider theme={muiTheme}>
            <Box sx={{ position: "relative" }}>
                <Box
                    sx={{
                        position: "absolute",
                        width: window.innerWidth,
                        height: window.innerHeight,
                        border: "1px solid red",
                    }}
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
        </ThemeProvider>
    )
}

export default App
