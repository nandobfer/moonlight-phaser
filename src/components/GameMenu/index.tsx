import { Dialog, MenuItem } from "@mui/material"
import React from "react"
import { useGameMenu } from "../../hooks/useGameMenu"
import styles from "./styles"

interface GameMenuProps {}

export const GameMenu: React.FC<GameMenuProps> = ({}) => {
    const { open, setOpen } = useGameMenu()

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={styles.body}>
            <MenuItem>oi</MenuItem>
        </Dialog>
    )
}
