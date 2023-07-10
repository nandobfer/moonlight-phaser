import React, { useEffect } from "react"
import { Box, Button, IconButton, TextField } from "@mui/material"
import { socket } from "../../io"
import { useIo } from "../../hooks/useIo"
import { Container } from "../../components/Container"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { Form, Formik } from "formik"
import { useUser } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { CurrentRoom } from "./CurrentRoom"
import { usePlayer } from "../../hooks/usePlayer"

interface RoomListProps {}

interface NewRoomForm {
    name: ""
}

export const RoomList: React.FC<RoomListProps> = ({}) => {
    const navigate = useNavigate()

    const { rooms, room, setRoom } = useIo()
    const { user } = useUser()
    const player = usePlayer()

    const newRoomValues: NewRoomForm = {
        name: "",
    }

    const handleNewRoomSubmuit = (values: NewRoomForm) => {
        rooms.new(values.name)
    }

    useEffect(() => {
        if (!user) {
            navigate("/")
        } else {
            rooms.refresh()
        }
    }, [])

    return room ? (
        <CurrentRoom room={room} />
    ) : (
        <Box sx={{}}>
            <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                {rooms.list.map((room) => (
                    <Container key={room.id}>
                        <Box sx={{ width: "100%", justifyContent: "space-between" }}>
                            <p>{room.name}</p>
                            <p>{room.clients.length} / 4</p>
                        </Box>
                    </Container>
                ))}
                <Container>
                    <Box sx={{ gap: "1vw" }}>
                        <Formik initialValues={newRoomValues} onSubmit={handleNewRoomSubmuit}>
                            {({ values, handleChange }) => (
                                <Form style={{ display: "contents" }}>
                                    <TextField variant="standard" name="name" value={values.name} onChange={handleChange} />
                                    <Button variant="outlined" type="submit">
                                        <AddCircleIcon /> new
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}
