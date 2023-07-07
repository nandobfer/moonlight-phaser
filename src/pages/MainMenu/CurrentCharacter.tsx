import React from "react"
import { Box, Paper, TextField } from "@mui/material"
import colors from "../../colors"
import { Container } from "../../components/Container"
import { images } from "../../images"
import { SkillOrb } from "../../components/SkillOrb"

interface CurrentCharacterProps {
    character: Character
}

export const CurrentCharacter: React.FC<CurrentCharacterProps> = ({ character }) => {
    const { sprites } = images

    return (
        <Container label={character.name} sx={{ width: "100%" }}>
            <Box sx={{ gap: "2vw", width: "100%" }}>
                <img src={sprites[character.sprite as 1 | 2].pic} alt="picture" style={{ width: "10vw", flexShrink: 0 }} />

                <Box sx={{ flexDirection: "column", gap: "2vw", flexShrink: 0, justifyContent: "center" }}>
                    <p>id: {character.id}</p>
                    <p>level: {character.stats.level}</p>
                    <p>health: {character.stats.health}</p>
                    <p>speed: {character.stats.speed}</p>
                </Box>

                <Box sx={{ width: "100%", justifyContent: "space-evenly" }}>
                    <SkillOrb label="Dex" attribute={character.attributes.dexterity} color="success" scale={2} />
                    <SkillOrb label="Int" attribute={character.attributes.inteligence} color="info" scale={2} />
                    <SkillOrb label="Str" attribute={character.attributes.strength} color="error" scale={2} />
                    <SkillOrb label="Def" attribute={character.attributes.defence} color="warning" scale={2} />
                </Box>
            </Box>
        </Container>
    )
}
