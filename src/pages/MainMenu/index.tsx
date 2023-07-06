import { Box, Button, Paper } from "@mui/material"
import React from "react"
import Background from "../../assets/mainmenu_background.jpg"
import { useNavigate } from "react-router-dom"

interface MainMenuProps {}

export const MainMenu: React.FC<MainMenuProps> = ({}) => {
    const navigate = useNavigate()

    const handlePlay = () => {
        navigate("/game")
    }

    return (
        <Paper
            sx={{
                width: "100%",
                borderRadius: 0,
                backgroundImage: `url(${Background})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                flexDirection: "column",
                padding: "5vw",
            }}
        >
            <Button variant="contained" onClick={() => handlePlay()}>
                play
            </Button>
        </Paper>
    )
}
