import { AlertColor, Box, LinearProgress, SxProps } from "@mui/material"
import React from "react"
import colors from "../../colors"
import { useMuiTheme } from "../../hooks/useMuiTheme"

interface ProgressBarProps {
    min: number
    max: number
    color: AlertColor
    height: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ min, max, color, height }) => {
    const normalise = (value: number) => ((value - 0) * 100) / (max - 0)
    const theme = useMuiTheme()

    const progress_style: SxProps = {
        height: `${height}vw`,
        borderRadius: "5vw",
        boxShadow: `0px 0px 15px ${theme.palette[color].main}`,
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
                    {min.toFixed(0)} / {max}
                </p>
            </Box>
            <LinearProgress variant="determinate" value={normalise(min)} color={color} sx={progress_style} />
        </Box>
    )
}
