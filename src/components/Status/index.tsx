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
        <Box color={"white"} sx={{ width: "30vw", padding: "2vw", flexDirection: "column" }}>
            <ProgressBar min={player.stats.health} max={player.stats.maxHealth} color="error" />
        </Box>
    )
}
