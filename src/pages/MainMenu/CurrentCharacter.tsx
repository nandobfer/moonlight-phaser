import React from "react"
import { Box, Paper, TextField } from "@mui/material"
import colors from "../../colors"
import { Container } from "../../components/Container"
import { images } from "../../images"
import { SkillOrb } from "../../components/SkillOrb"
import { useMuiTheme } from "../../hooks/useMuiTheme"

interface CurrentCharacterProps {
    character: Character
}

export const CurrentCharacter: React.FC<CurrentCharacterProps> = ({ character }) => {
    const theme = useMuiTheme()
    const { sprites } = images

    return (
        <Container label={character.name} sx={{ width: "100%", gap: "2vw", flexShrink: 0, flexGrow: 0 }}>
            <img src={sprites[character.sprite as 1 | 2].pic} alt="picture" style={{ width: "10vw", flexShrink: 0 }} />
            <Box sx={{ gap: "2vw", width: "100%", flexDirection: "column" }}>
                <Box sx={{ justifyContent: "space-between", fontSize: "0.9vw" }}>
                    <Box sx={{ flexDirection: "column", gap: "2vw", flexShrink: 0, justifyContent: "center" }}>
                        <p>level: {character.stats.level}</p>
                        <p>speed: {character.stats.speed}</p>
                    </Box>
                    <Box sx={{ flexDirection: "column", flexShrink: 0, justifyContent: "space-between" }}>
                        <p style={{ color: theme.palette.warning.main }}>
                            life: {character.stats.life} (+{character.stats.regeneration.life})
                        </p>
                        <p style={{ color: theme.palette.success.main }}>
                            stamina: {character.stats.stamina} (+{character.stats.regeneration.stamina})
                        </p>
                        <p style={{ color: theme.palette.info.main }}>
                            mana: {character.stats.mana} (+{character.stats.regeneration.mana})
                        </p>
                        <p style={{ color: theme.palette.error.main }}>
                            rage: {character.stats.rage} (+{character.stats.regeneration.rage})
                        </p>
                    </Box>
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
