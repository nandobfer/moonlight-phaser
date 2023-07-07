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
                {
                    id: 1,
                    value: player.stats.health,
                    set: (value: number) => player.setStats({ ...player.stats, health: value }),
                    name: "health",
                },
                {
                    id: 2,
                    value: player.stats.maxHealth,
                    set: (value: number) => player.setStats({ ...player.stats, maxHealth: value }),
                    name: "max health",
                },
                {
                    id: 3,
                    value: player.stats.speed,
                    set: (value: number) => player.setStats({ ...player.stats, speed: value }),
                    name: "speed",
                },
            ].map((stat) => {
                const initialValues = { stat: stat.value }
                const handleSubmit = (values: { stat: number }) => {
                    stat.set(values.stat)
                }

                return (
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} key={stat.id} enableReinitialize>
                        {({ values, handleChange }) => (
                            <Form style={{ display: "flex" }}>
                                <TextField
                                    label={stat.name}
                                    name="stat"
                                    value={values.stat}
                                    onChange={handleChange}
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                />
                            </Form>
                        )}
                    </Formik>
                )
            })}

            <Formik initialValues={player.position} onSubmit={(values) => player.setPosition(values)} enableReinitialize>
                {({ values, handleChange }) => (
                    <Form style={{ display: "flex", flexDirection: "row", gap: "1vw" }}>
                        <TextField label={"x"} name="x" value={values.x} onChange={handleChange} variant="standard" />
                        <TextField label={"y"} name="y" value={values.y} onChange={handleChange} variant="standard" />
                        <Button type="submit" sx={{}} variant="contained">
                            ok
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
