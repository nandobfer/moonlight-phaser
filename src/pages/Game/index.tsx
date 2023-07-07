import React, { useEffect, useLayoutEffect, useRef } from "react"
import { usePlayer } from "../../hooks/usePlayer"
import MainScene from "../../game/mainScene"
import { Box } from "@mui/material"
import { Status } from "../../components/Status"
import { ContextUi } from "../../components/ContextUi"
import { useGameMenu } from "../../hooks/useGameMenu"
import { GameMenu } from "../../components/GameMenu"
import { useGame } from "../../hooks/useGame"
import { useLocation } from "react-router-dom"

interface GameProps {}

export const Game: React.FC<GameProps> = ({}) => {
    const location = useLocation()
    const player = usePlayer()
    const gameMenu = useGameMenu()
    const { gameInstance, sceneInstance, game, scene, setGameInstance } = useGame()

    useEffect(() => {
        if (sceneInstance) {
            sceneInstance.events.on("setPosition", (newPosition: { x: number; y: number }) => {
                player.setPosition(newPosition)
            })
        }

        if (sceneInstance) {
            sceneInstance.events.on("gameMenu", () => {
                gameMenu.setOpen(true)
            })
        }

        return () => {
            if (sceneInstance) {
                sceneInstance.events.off("setPosition")
                sceneInstance.events.off("gameMenu")
            }
        }
    }, [sceneInstance])

    useEffect(() => {
        if (scene) {
            if (gameMenu.open) {
                scene.game.pause()
            } else {
                scene.game.resume()
            }
        }
    }, [gameMenu.open])

    useEffect(() => {
        console.log("mounted")
        if (!gameInstance) {
            console.log("creating game")
            const config: Phaser.Types.Core.GameConfig = {
                type: Phaser.AUTO,
                width: window.innerWidth,
                height: window.innerHeight,
                parent: "game-container",
                autoFocus: true,
                physics: {
                    default: "arcade",
                },
                scene: [MainScene],
            }
            setGameInstance(new Phaser.Game(config))
        }

        // return () => {
        //     console.log("unmounting")
        //     gameInstance?.destroy(true)
        //     setGameInstance(undefined)
        // }
    }, [])

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
                <Status player={player as Character} />
                <ContextUi player={player as Character} />
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
