import { Box, Button, Paper, TextField } from "@mui/material"
import React, { useState, useEffect } from "react"
import Moonlight from "../../assets/moonlight.png"
import { useNavigate } from "react-router-dom"
import { LoginForm } from "../../components/LoginForm"
import { usePlayer } from "../../hooks/usePlayer"
import colors from "../../colors"
import { CurrentCharacter } from "./CurrentCharacter"
import { CharacterForm } from "./CharacterForm"
import { useCharacters } from "../../hooks/useCharacters"
import { CharacterContainer } from "./CharacterContainer"

interface MainMenuProps {}

export const MainMenu: React.FC<MainMenuProps> = ({}) => {
    const navigate = useNavigate()
    const player = usePlayer()

    const { characters } = useCharacters()

    const [logging, setLogging] = useState(false)
    const [loading, setLoading] = useState(false)
    const [creatingCharacter, setCreatingCharacter] = useState(!player.id)

    const handlePlay = () => {
        navigate("/game")
    }

    const handleCancelLogin = () => {
        setLogging(false)
    }

    const handleLogin = () => {
        setLogging(true)
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
                    {logging ? (
                        <LoginForm handleCancelLogin={handleCancelLogin} />
                    ) : (
                        <>
                            <Button variant="contained" onClick={() => handlePlay()} disabled={!player.id}>
                                singleplayer
                            </Button>
                            <Button variant="contained" onClick={() => handleLogin()} disabled={!player.id}>
                                multiplayer
                            </Button>
                        </>
                    )}
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
                            height: "40vh",
                            overflowY: "auto",
                            padding: "1vw 0",

                            "::-webkit-scrollbar-track": {
                                background: colors.background,
                                margin: "1vw 0",
                            },

                            "::-webkit-scrollbar-thumb": {
                                background: colors.primary,
                            },
                        }}
                    >
                        {characters.map((character) => (
                            <CharacterContainer
                                key={character.id}
                                character={character}
                                onClick={() => player.setPlayer(character)}
                            />
                        ))}
                    </Box>
                </Paper>
            )}
        </Box>
    )
}
