import { Box, Button, Card, CircularProgress, Container, Paper, TextField } from "@mui/material"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import { useApi } from "../../hooks/useApi"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "burgos-snackbar"
import { useUser } from "../../hooks/useUser"

interface LoginProps {
    handleCancelLogin: () => void
}

interface LoginFormValues {
    user: string
    password: string
}

export const LoginForm: React.FC<LoginProps> = ({ handleCancelLogin }) => {
    const api = useApi()
    const navigate = useNavigate()
    // const websocket = useWebsocket()

    const { setUser } = useUser()
    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)

    const initialValues = {
        user: "",
        password: "",
    }

    const handleSubmit = (values: LoginFormValues) => {
        if (loading) return

        setLoading(true)
        api.user.login({
            data: values,
            callback: (response: { data: User }) => {
                const user = response.data
                if (user) {
                    navigate("/game")
                    setUser(user)
                    // websocket.send({ connect: { user } })
                } else {
                    snackbar({
                        severity: "error",
                        text: "login failed",
                    })
                }
            },
            finallyCallback: () => setLoading(false),
        })
    }

    return (
        <Box sx={{ flexDirection: "column", gap: "1vw" }}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form style={{ display: "contents" }}>
                        <TextField
                            label="user"
                            name="user"
                            value={values.user}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                        <TextField
                            label="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            type="password"
                            required
                            autoComplete="off"
                        />
                        <Box sx={{ gap: "1vw", width: "100%" }}>
                            <Button variant="outlined" onClick={handleCancelLogin} fullWidth>
                                cancel
                            </Button>
                            <Button type="submit" variant="contained" fullWidth>
                                {loading ? <CircularProgress size="1.5rem" color="secondary" /> : "login"}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
