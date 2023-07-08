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
        <Container label={character.name} sx={{ width: "100%", gap: "1vw", flexShrink: 0, flexGrow: 0 }}>
            <img src={sprites[character.sprite as 1 | 2].pic} alt="picture" style={{ width: "7vw", flexShrink: 0 }} />
            <Box sx={{ gap: "2vw", width: "100%", flexDirection: "column" }}>
                <Box sx={{ justifyContent: "space-between", fontSize: "0.8vw" }}>
                    <Box sx={{ flexDirection: "column", flexShrink: 0, justifyContent: "space-between" }}>
                        <p>level: {character.stats.level}</p>
                        <p>speed: {character.stats.speed}</p>
                        <p style={{ color: theme.palette.warning.main }}>
                            life: {character.stats.life.max} ({character.stats.regeneration.life > 0 && "+"}
                            {character.stats.regeneration.life.toFixed(2)})
                        </p>
                        <p style={{ color: theme.palette.success.main }}>
                            stamina: {character.stats.stamina.max} ({character.stats.regeneration.stamina > 0 && "+"}
                            {character.stats.regeneration.stamina.toFixed(2)})
                        </p>
                        <p style={{ color: theme.palette.info.main }}>
                            mana: {character.stats.mana.max} ({character.stats.regeneration.mana > 0 && "+"}
                            {character.stats.regeneration.mana.toFixed(2)})
                        </p>
                        <p style={{ color: theme.palette.error.main }}>
                            rage: {character.stats.rage.max} ({character.stats.regeneration.rage > 0 && "+"}
                            {character.stats.regeneration.rage.toFixed(2)})
                        </p>
                    </Box>
                    <Box
                        sx={{
                            flexDirection: "column",
                            flexShrink: 0,
                            justifyContent: "space-between",
                        }}
                    >
                        <p style={{ color: theme.palette.warning.main }}>armor: {character.stats.armor}</p>
                        <p>physical resistance: {character.stats.resistance.physical}</p>
                        <p>magical resistance: {character.stats.resistance.magical}</p>
                        <p>block chance: {character.stats.block.chance}</p>
                        <p>block value: {character.stats.block.value}</p>
                    </Box>
                    <Box sx={{ flexDirection: "column", flexShrink: 0, justifyContent: "space-between" }}>
                        <p style={{ color: theme.palette.error.main }}>attack power: {character.stats.attack.power}</p>
                        <p style={{ color: theme.palette.info.main }}>magical power: {character.stats.attack.magic}</p>
                        <p style={{ color: theme.palette.success.main }}>attack speed: {character.stats.attack.speed}</p>
                        <p>attack range: {character.stats.attack.range}</p>
                        <p>critical chance: {character.stats.attack.critical.chance}</p>
                        <p>critical multiplier: {character.stats.attack.critical.multiplier}</p>
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
