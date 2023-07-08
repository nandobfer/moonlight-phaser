import { Box, SxProps } from "@mui/material"
import React from "react"
import { usePlayer } from "../../hooks/usePlayer"
import { ProgressBar } from "./ProgressBar"

interface StatusProps {
    player: Character
}

export const Status: React.FC<StatusProps> = ({ player }) => {
    const {} = usePlayer()

    return (
        <Box color={"white"} sx={{ width: "30vw", padding: "2vw", flexDirection: "column", gap: "1vw" }}>
            <ProgressBar min={player.stats.life.current} max={player.stats.life.max} color="error" height={2} />
            <ProgressBar min={player.stats.mana.current} max={player.stats.mana.max} color="info" height={1} />
            <ProgressBar min={player.stats.stamina.current} max={player.stats.stamina.max} color="success" height={1} />
            <ProgressBar min={player.stats.rage.current} max={player.stats.rage.max} color="error" height={1} />
        </Box>
    )
}
