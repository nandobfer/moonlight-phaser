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
            <ProgressBar min={player.stats.life} max={player.stats.maxLife} color="error" height={2} />
            <ProgressBar min={player.stats.life} max={player.stats.maxLife} color="info" height={1} />
        </Box>
    )
}
