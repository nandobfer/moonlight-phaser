import React, { useContext, useEffect, useRef, useState } from "react"
import { Box, Button, ThemeProvider } from "@mui/material"
import "./sass/all.scss"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import { BrowserRouter } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { Login } from "./pages/Login"
import { Game } from "./pages/Game"
import { PlayerContextProvider } from "./contexts/playerContext"
import { UserProvider } from "./contexts/userContext"

const App: React.FC = () => {
    const muiTheme = useMuiTheme()

    return (
        <ThemeProvider theme={muiTheme}>
            <SnackbarProvider>
                <BrowserRouter>
                    <UserProvider>
                        <PlayerContextProvider>
                            <Snackbar />
                            <Routes>
                                <Route index element={<Login />} />
                                <Route path="*" element={<Login />} />
                                <Route path="/game" element={<Game />} />
                            </Routes>
                        </PlayerContextProvider>
                    </UserProvider>
                </BrowserRouter>
            </SnackbarProvider>
        </ThemeProvider>
    )
}

export default App
