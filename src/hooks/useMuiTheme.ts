import { createTheme } from "@mui/material"
import colors from "../colors"
import { useMemo } from "react"

export const useMuiTheme = () => {
    const THEME = createTheme({
        typography: {
            fontFamily: ["Fira Code"].join(","),
        },
        palette: {
            mode: "dark",

            primary: {
                main: colors.primary,
            },
            secondary: {
                main: colors.secondary,
            },
            text: {
                primary: colors.text.primary,
            },
        },
    })

    return THEME
}
