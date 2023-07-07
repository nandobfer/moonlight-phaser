import { Box, LinearProgress, SxProps } from "@mui/material"
import React from "react"
import { usePlayer } from "../../hooks/usePlayer"

interface StatusProps {}

export const Status: React.FC<StatusProps> = ({}) => {
    const player = usePlayer()

    const normalise = (value: number) => ((value - 0) * 100) / (player.stats.maxHealth - 0)

    const progress_style: SxProps = {
        backgroundColor: "red",
    }

    return (
        <Box color={"white"} sx={{ width: "30vw", padding: "2vw", flexDirection: "column" }}>
            <LinearProgress variant="determinate" value={normalise(player.stats.health)} color="error" />
        </Box>
    )
}
