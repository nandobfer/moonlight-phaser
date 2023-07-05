import React from 'react';
import ReactDOM from "react-dom/client"
import App from './App';
import { PlayerContextProvider } from "./contexts/playerContext"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <React.StrictMode>
        <PlayerContextProvider>
            <App />
        </PlayerContextProvider>
    </React.StrictMode>
)
