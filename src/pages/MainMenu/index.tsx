import { Box, Button, Paper } from "@mui/material"
import React, { useState } from "react"
import Moonlight from "../../assets/moonlight.png"
import { useNavigate } from "react-router-dom"
import { LoginForm } from "../../components/LoginForm"

interface MainMenuProps {}

export const MainMenu: React.FC<MainMenuProps> = ({}) => {
    const navigate = useNavigate()

    const [logging, setLogging] = useState(false)
    const [loading, setLoading] = useState(false)

    const handlePlay = () => {
        navigate("/game")
    }

    const handleCancelLogin = () => {
        setLogging(false)
    }

    const handleLogin = () => {
        setLogging(true)
    }

    return (
        <Paper
            sx={{
                width: "100%",
                borderRadius: 0,
                // backgroundImage: `url(${Background})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                flexDirection: "column",
                alignItems: "center",
                padding: "5vw",
                gap: "2vw",
            }}
        >
            <img
                src={Moonlight}
                alt=""
                style={{
                    objectFit: "contain",
                    width: "20vw",
                    aspectRatio: "1/1",
                }}
            />
            <Box sx={{ width: "20vw", gap: "1vw", flexDirection: "column" }}>
                {logging ? (
                    <LoginForm handleCancelLogin={handleCancelLogin} />
                ) : (
                    <>
                        <Button variant="contained" onClick={() => handlePlay()}>
                            singleplayer
                        </Button>
                        <Button variant="contained" onClick={() => handleLogin()}>
                            multiplayer
                        </Button>
                    </>
                )}
            </Box>
        </Paper>
    )
}
