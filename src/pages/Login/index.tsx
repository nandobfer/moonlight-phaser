import { Box, Button, Card, CircularProgress, Container, Paper, TextField } from "@mui/material"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import { useApi } from "../../hooks/useApi"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "burgos-snackbar"
import { useUser } from "../../hooks/useUser"

interface LoginProps {}

interface LoginForm {
    user: string
    password: string
}

export const Login: React.FC<LoginProps> = ({}) => {
    const api = useApi()
    const navigate = useNavigate()
    const { setUser } = useUser()

    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)

    const initialValues = {
        user: "",
        password: "",
    }

    const handleSubmit = (values: LoginForm) => {
        if (loading) return

        setLoading(true)
        api.user.login({
            data: values,
            callback: (response: { data: User }) => {
                const user = response.data
                if (user) {
                    navigate("/game")
                    setUser(user)
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
        <Paper sx={{ flexDirection: "column", width: "100%", borderRadius: 0, padding: "2vw", gap: "2vw" }}>
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
                        <Button type="submit" variant="contained">
                            {loading ? <CircularProgress size="1.5rem" color="secondary" /> : "login"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Paper>
    )
}
