import { Box, Button, Paper, TextField } from "@mui/material"
import React, { useState, useEffect } from "react"
import Moonlight from "../../assets/moonlight.png"
import { Route, Routes, useNavigate } from "react-router-dom"
import { LoginForm } from "../../components/LoginForm"
import { usePlayer } from "../../hooks/usePlayer"
import colors from "../../colors"
import { CurrentCharacter } from "./CurrentCharacter"
import { CharacterForm } from "./CharacterForm"
import { useCharacters } from "../../hooks/useCharacters"
import { CharacterContainer } from "./CharacterContainer"
import { useReset } from "../../hooks/useReset"
import { RoomList } from "./RoomList"

interface MainMenuProps {}

export const MainMenu: React.FC<MainMenuProps> = ({}) => {
    const navigate = useNavigate()
    const player = usePlayer()
    const reset = useReset()

    const { characters } = useCharacters()

    const [creatingCharacter, setCreatingCharacter] = useState(!player.id)

    const handlePlay = () => {
        navigate("/game")
    }

    const handleCancelLogin = () => {
        navigate("/")
    }

    const handleLogin = () => {
        navigate("/login")
    }

    useEffect(() => {
        if (!player.id) setCreatingCharacter(true)
    }, [player])

    return (
        <Box sx={{ width: "100%", backgroundColor: colors.primary, padding: "0.5vw", gap: "0.5vw" }}>
            <Paper
                sx={{
                    width: "50%",
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
                        width: "20vw",
                        aspectRatio: "1/1",
                    }}
                />
                <Box sx={{ width: "20vw", gap: "1vw", flexDirection: "column" }}>
                    <Routes>
                        <Route
                            index
                            element={
                                <>
                                    <Button variant="contained" onClick={() => handlePlay()} disabled={!player.id}>
                                        singleplayer
                                    </Button>
                                    <Button variant="contained" onClick={() => handleLogin()} disabled={!player.id}>
                                        multiplayer
                                    </Button>
                                    <Button variant="outlined" onClick={() => reset()} disabled={!player.id}>
                                        reset data
                                    </Button>
                                </>
                            }
                        />
                        <Route path="login/" element={<LoginForm />} />
                        <Route path="rooms/" element={<RoomList />} />
                    </Routes>
                </Box>
            </Paper>

            {creatingCharacter ? (
                <CharacterForm finish={() => setCreatingCharacter(false)} />
            ) : (
                <Paper sx={{ width: "50%", flexDirection: "column", padding: "2vw", gap: "1vw" }}>
                    {player.id && <CurrentCharacter character={player as Character} />}
                    <Button variant="outlined" onClick={() => setCreatingCharacter(true)}>
                        new character
                    </Button>
                    <Box
                        sx={{
                            flexDirection: "column",
                            gap: "1vw",
                            height: "20vw",
                            overflowY: "auto",
                            padding: "1vw 0",

                            "::-webkit-scrollbar-track": {
                                background: colors.background,
                                margin: "1vw 0",
                            },

                            "::-webkit-scrollbar-thumb": {
                                background: colors.primaryTransparent,
                            },
                        }}
                    >
                        {characters.map((character) => (
                            <CharacterContainer key={character.id} character={character} onClick={() => player.setPlayer(character)} />
                        ))}
                    </Box>
                </Paper>
            )}
        </Box>
    )
}
