import { Box, Button, TextField } from "@mui/material"
import React from "react"
import { usePlayer } from "../../hooks/usePlayer"
import { Formik, Form } from "formik"

interface ContextUiProps {
    player: Character
}

export const ContextUi: React.FC<ContextUiProps> = ({ player }) => {
    const { setPosition, updateGame } = usePlayer()

    return (
        <Box
            sx={{
                padding: "1vw",
                flexDirection: "column",
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "30vw",
                gap: "1vw",
            }}
        ></Box>
    )
}
