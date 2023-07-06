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

    const handleLogin = () => {
        navigate("/login")
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
                gap: "2vw",
            }}
        >
            <Button variant="contained" onClick={() => handlePlay()}>
                play
            </Button>
            <Button variant="contained" onClick={() => handleLogin()}>
                login
            </Button>
        </Paper>
    )
}
