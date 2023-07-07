import React from "react"
import { Box, Button } from "@mui/material"

interface SkillButtonProps {
    attribute: number
    label: string
    color: "primary" | "secondary" | "success" | "error" | "info" | "warning"
    onClick: (value: number) => void
}

export const SkillButton: React.FC<SkillButtonProps> = ({ attribute, onClick, color, label }) => {
    return (
        <Box sx={{ alignItems: "center", gap: "1vw", color: `${color}.main` }}>
            {label}
            <Button
                variant="outlined"
                color={color}
                onClick={() => onClick(1)}
                onContextMenu={(event) => {
                    event.preventDefault()
                    onClick(-1)
                }}
                sx={{
                    borderRadius: "100%",
                    minWidth: 0,
                    width: "2vw",
                    height: "2vw",
                    padding: "1vw",
                }}
            >
                {attribute}
            </Button>
        </Box>
    )
}
