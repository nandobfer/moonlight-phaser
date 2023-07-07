import { AlertColor, Box, LinearProgress, SxProps } from "@mui/material"
import React from "react"

interface ProgressBarProps {
    min: number
    max: number
    color: AlertColor
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ min, max, color }) => {
    const normalise = (value: number) => ((value - 0) * 100) / (max - 0)

    const progress_style: SxProps = {
        height: "2vw",
        borderRadius: "5vw",
    }
    return (
        <Box sx={{ width: "100%", height: "min-contents", flexDirection: "column", position: "relative" }}>
            <Box
                sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    zIndex: 5,
                    fontSize: "1vw",
                }}
            >
                <p>
                    {min} / {max}
                </p>
            </Box>
            <LinearProgress variant="determinate" value={normalise(min)} color={color} sx={progress_style} />
        </Box>
    )
}
