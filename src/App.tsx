import React, { useContext, useEffect, useRef, useState } from "react"
import { Box, Button, ThemeProvider } from "@mui/material"
import "./sass/all.scss"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import { BrowserRouter } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { Game } from "./pages/Game"
import { PlayerContextProvider } from "./contexts/playerContext"
import { UserProvider } from "./contexts/userContext"
import { GameMenuProvider } from "./contexts/gameMenuContext"
import { GameProvider } from "./contexts/gameContext"
import { MainMenu } from "./pages/MainMenu"
import { CharactersProvider } from "./contexts/charactersContext"

const App: React.FC = () => {
    const muiTheme = useMuiTheme()

    return (
        <ThemeProvider theme={muiTheme}>
            <SnackbarProvider>
                <BrowserRouter>
                    <CharactersProvider>
                        <GameProvider>
                            <UserProvider>
                                <PlayerContextProvider>
                                    <GameMenuProvider>
                                        <Snackbar />
                                        <Routes>
                                            <Route index element={<MainMenu />} />
                                            <Route path="*" element={<MainMenu />} />
                                            <Route path="/game" element={<Game />} />
                                        </Routes>
                                    </GameMenuProvider>
                                </PlayerContextProvider>
                            </UserProvider>
                        </GameProvider>
                    </CharactersProvider>
                </BrowserRouter>
            </SnackbarProvider>
        </ThemeProvider>
    )
}

export default App
