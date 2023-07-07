import { Dialog, DialogContent, MenuItem } from "@mui/material"
import React from "react"
import { useGameMenu } from "../../hooks/useGameMenu"
import styles from "./styles"
import { useGame } from "../../hooks/useGame"
import { useNavigate } from "react-router-dom"

interface GameMenuProps {}

export const GameMenu: React.FC<GameMenuProps> = ({}) => {
    const navigate = useNavigate()

    const { open, setOpen } = useGameMenu()
    const { game, scene } = useGame()

    const handleClose = () => {
        setOpen(false)
    }

    const handleMainMenu = () => {
        handleClose()
        // game?.destroy(true, false)
        scene?.socket?.disconnect()
        navigate("/")
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={styles.body}>
            <DialogContent sx={styles.content}>
                <MenuItem onClick={() => handleClose()}>resume</MenuItem>
                <MenuItem onClick={() => handleMainMenu()}>main menu</MenuItem>
            </DialogContent>
        </Dialog>
    )
}
