import { Box, Button, TextField } from "@mui/material"
import React from "react"
import { usePlayer } from "../../hooks/usePlayer"
import { Formik, Form } from "formik"

interface ContextUiProps {}

export const ContextUi: React.FC<ContextUiProps> = ({}) => {
    const player = usePlayer()

    return (
        <Box
            sx={{
                backgroundColor: "white",
                padding: "1vw",
                flexDirection: "column",
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "30vw",
                gap: "1vw",
            }}
        >
            {[
                { id: 1, value: player.health, set: player.setHealth, name: "health" },
                { id: 2, value: player.maxHealth, set: player.setMaxHealth, name: "max health" },
                { id: 3, value: player.speed, set: player.setSpeed, name: "speed" },
            ].map((stat) => {
                const initialValues = { stat: stat.value }
                const handleSubmit = (values: { stat: number }) => {
                    stat.set(values.stat)
                }

                return (
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} key={stat.id}>
                        {({ values, handleChange }) => (
                            <Form style={{ display: "flex" }}>
                                <TextField
                                    label={stat.name}
                                    name="stat"
                                    value={values.stat}
                                    onChange={handleChange}
                                    type="number"
                                    fullWidth
                                />
                            </Form>
                        )}
                    </Formik>
                )
            })}

            <Formik initialValues={player.position} onSubmit={(values) => player.setPosition(values)}>
                {({ values, handleChange }) => (
                    <Form style={{ display: "flex", gap: "1vw" }}>
                        <TextField label={"x"} name="x" value={values.x} onChange={handleChange} />
                        <TextField label={"y"} name="y" value={values.y} onChange={handleChange} />
                        <Button type="submit" sx={{}} variant="contained">
                            ok
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
