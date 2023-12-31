import React, { ReactNode } from "react"
import { Box, SxProps, TextField } from "@mui/material"

interface ContainerProps {
    children?: ReactNode
    sx?: SxProps
    label?: string
    onClick?: () => void
    focused?: boolean
}

export const Container: React.FC<ContainerProps> = ({ children, sx, label, onClick, focused }) => {
    const _sx: SxProps = { padding: "1vw", cursor: "default", ...sx }

    return (
        <TextField
            focused={focused}
            label={label}
            fullWidth
            inputProps={{ style: { width: 0 } }}
            sx={{ cursor: "default" }}
            InputProps={{
                sx: _sx,
                startAdornment: children || <></>,
            }}
            onClick={onClick}
        />
    )
}
