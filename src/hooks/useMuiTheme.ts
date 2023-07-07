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
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    input: {
                        "&:-webkit-autofill": {
                            "-webkit-box-shadow": "0 0 0 100px #121212 inset",
                            "-webkit-text-fill-color": colors.text.primary,
                        },
                    },
                },
            },
        },
    })

    return THEME
}
