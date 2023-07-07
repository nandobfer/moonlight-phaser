import React from "react"
import { Box, Button } from "@mui/material"

interface SkillOrbProps {
    attribute: number
    label: string
    color: "primary" | "secondary" | "success" | "error" | "info" | "warning"
    scale?: number
}

export const SkillOrb: React.FC<SkillOrbProps> = ({ attribute, color, label, scale = 1 }) => {
    return (
        <Box
            sx={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: `${color}.main`,
            }}
        >
            <Button
                variant="outlined"
                color={color}
                sx={{
                    borderRadius: "100%",
                    minWidth: 0,
                    width: `${2 * scale}vw`,
                    height: `${2 * scale}vw`,
                    padding: "1vw",
                    fontSize: `${0.875 * scale}rem`,
                    // pointerEvents: "none",
                    cursor: "default",
                }}
            >
                {attribute}
            </Button>
            {label}
        </Box>
    )
}
