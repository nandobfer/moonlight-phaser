import React, { useState } from "react"
import { Box, Button, IconButton, MenuItem, Paper, SxProps, TextField } from "@mui/material"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { images } from "../../images"
import colors from "../../colors"
import { Container } from "../../components/Container"
import { SkillButton } from "./SkillButton"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useCharacters } from "../../hooks/useCharacters"
import { usePlayer } from "../../hooks/usePlayer"

interface CharacterFormProps {
    finish: () => void
}

type AttributeKey = "defence" | "dexterity" | "inteligence" | "strength"

type SpriteType = 1 | 2

export const CharacterForm: React.FC<CharacterFormProps> = ({ finish }) => {
    const { sprites } = images
    const { get, set } = useLocalStorage()
    const { characters, setCharacters } = useCharacters()
    const { setPlayer } = usePlayer()

    const [currentSprite, setCurrentSprite] = useState<SpriteType>(1)
    const [name, setName] = useState("")
    const [remainingPoints, setRemainingPoints] = useState(5)
    const [attributes, setAttributes] = useState<Attributes>({
        defence: 0,
        dexterity: 0,
        inteligence: 0,
        strength: 0,
    })

    const arrow_style: SxProps = {
        width: "5vw",
        height: "5vw",
    }

    const handleSubmit = () => {
        const lastUsedId: number = get("moonlight:lastId") || 0

        const character: Character = {
            id: lastUsedId + 1,
            name,
            sprite: currentSprite,

            attributes,

            stats: {
                level: 1,
                health: 100,
                maxHealth: 100,
                speed: 5,
            },

            position: {
                x: 0,
                y: 0,
            },
        }

        setCharacters([...characters, character])
        setPlayer(character)
        setPlayer(character)
        finish()
        set("moonlight:lastId", character.id)
    }

    const changeSprite = (value: number) => {
        setCurrentSprite((currentSprite + value) as SpriteType)
    }

    const handleAttributeClick = (key: AttributeKey, value: number) => {
        if (value > 0 && remainingPoints == 0) return
        if (value < 0 && attributes[key] == 0) return
        setRemainingPoints(remainingPoints - value)
        setAttributes({ ...attributes, [key]: attributes[key] + value })
    }

    return (
        <Paper sx={{ width: "50%", flexDirection: "column", padding: "2vw", gap: "2vw" }}>
            <Box sx={{ width: "100%", justifyContent: "space-evenly", alignItems: "center" }}>
                <IconButton color="primary" onClick={() => changeSprite(-1)} disabled={currentSprite - 1 < 1}>
                    <ArrowBackIosNewIcon sx={arrow_style} />
                </IconButton>

                <img src={sprites[currentSprite].pic} alt="picture" style={{ width: "10vw" }} />

                <IconButton
                    color="primary"
                    onClick={() => changeSprite(+1)}
                    disabled={currentSprite + 1 > Object.entries(sprites).length}
                >
                    <ArrowBackIosNewIcon sx={{ ...arrow_style, rotate: "180deg" }} />
                </IconButton>
            </Box>

            <TextField label="name" value={name} onChange={(event) => setName(event.target.value)} />

            <Container label="attribute points" sx={{ alignItems: "center", width: "100%" }}>
                <Box sx={{ flexDirection: "column", alignItems: "center", width: "100%", gap: "1vw" }}>
                    <TextField
                        // label="points"
                        value={remainingPoints}
                        sx={{ display: "contents" }}
                        InputProps={{ readOnly: true, sx: { width: "5vw" } }}
                        inputProps={{ style: { textAlign: "center", fontSize: "2vw", cursor: "default" } }}
                        variant="standard"
                    />
                    <Box sx={{ width: "100%", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                        <SkillButton
                            label="Dex"
                            attribute={attributes.dexterity}
                            color="success"
                            onClick={(value) => handleAttributeClick("dexterity", value)}
                        />
                        <SkillButton
                            label="Int"
                            attribute={attributes.inteligence}
                            color="info"
                            onClick={(value) => handleAttributeClick("inteligence", value)}
                        />
                        <SkillButton
                            label="Str"
                            attribute={attributes.strength}
                            color="error"
                            onClick={(value) => handleAttributeClick("strength", value)}
                        />
                        <SkillButton
                            label="Def"
                            attribute={attributes.defence}
                            color="warning"
                            onClick={(value) => handleAttributeClick("defence", value)}
                        />
                    </Box>
                </Box>
            </Container>

            <Button variant="contained" disabled={!name || !!remainingPoints} onClick={handleSubmit}>
                create
            </Button>
        </Paper>
    )
}
