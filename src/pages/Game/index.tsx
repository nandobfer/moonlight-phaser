import React, { useEffect, useLayoutEffect, useRef } from "react"
import { usePlayer } from "../../hooks/usePlayer"
import MainScene from "../../game/mainScene"
import { Box } from "@mui/material"
import { Status } from "../../components/Status"
import { ContextUi } from "../../components/ContextUi"
import { useGameMenu } from "../../hooks/useGameMenu"
import { GameMenu } from "../../components/GameMenu"
import { useGame } from "../../hooks/useGame"

interface GameProps {}

export const Game: React.FC<GameProps> = ({}) => {
    const player = usePlayer()
    const { gameInstance, sceneInstance, game, scene } = useGame()
    const gameMenu = useGameMenu()

    useLayoutEffect(() => {
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

        sceneInstance.current = gameInstance.current.scene.keys.MainScene as MainScene
    }, [])

    useEffect(() => {
        if (sceneInstance.current) {
            sceneInstance.current.events.on("setPosition", (newPosition: { x: number; y: number }) => {
                player.setPosition(newPosition)
            })
        }

        if (sceneInstance.current) {
            sceneInstance.current.events.on("gameMenu", () => {
                gameMenu.setOpen(true)
            })
        }

        return () => {
            if (sceneInstance.current) {
                sceneInstance.current.events.off("setPosition")
                sceneInstance.current.events.off("gameMenu")
            }
        }
    }, [sceneInstance.current])

    useEffect(() => {
        if (scene?.player) {
            scene.player.syncReact(player)
        }
    }, [player])

    useEffect(() => {
        if (scene) {
            if (gameMenu.open) {
                scene.game.pause()
            } else {
                scene.game.resume()
            }
        }
    }, [gameMenu.open])

    return (
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
                <GameMenu />
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
