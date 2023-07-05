import React, { useEffect, useLayoutEffect, useRef } from "react"
import { usePlayer } from "../../hooks/usePlayer"
import MainScene from "../../game/mainScene"
import { Box } from "@mui/material"
import { Status } from "../../components/Status"
import { ContextUi } from "../../components/ContextUi"

interface GameProps {}

export const Game: React.FC<GameProps> = ({}) => {
    const player = usePlayer()
    const gameInstance = useRef<Phaser.Game>()
    const sceneInstance = useRef<MainScene>()

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
        console.log(sceneInstance.current)
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
    }, [sceneInstance.current])

    useEffect(() => {
        if (sceneInstance.current?.player) {
            const game = sceneInstance.current
            game.player.syncReact(player)
        }
    }, [player])

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
