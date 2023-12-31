import React from "react"
import { Box, Button } from "@mui/material"
import { Container } from "../../components/Container"
import { images } from "../../images"
import { SkillOrb } from "../../components/SkillOrb"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import AllInboxIcon from "@mui/icons-material/AllInbox"
import CycloneIcon from "@mui/icons-material/Cyclone"
import { useConfirmDialog } from "burgos-confirm"
import { useCharacters } from "../../hooks/useCharacters"
import { usePlayer } from "../../hooks/usePlayer"

interface CharacterContainerProps {
    character: Character
    onClick: () => void
}

export const CharacterContainer: React.FC<CharacterContainerProps> = ({ character, onClick }) => {
    const { sprites } = images
    const { confirm } = useConfirmDialog()
    const { characters, setCharacters } = useCharacters()
    const player = usePlayer()

    const handleDelete = () => {
        confirm({
            title: "delete character",
            content: "are you sure?",
            onConfirm: () => {
                setCharacters(characters.filter((char) => char.id != character.id))
                if (player.id == character.id) {
                    player.setPlayer(characters[0].id == character.id ? undefined : characters[0])
                }
            },
        })
    }

    const handleInventory = () => {}
    const handleSkills = () => {}

    return (
        <Container
            label={`${character.name} - ${character.stats.level}`}
            sx={{ width: "100%", cursor: "pointer" }}
            onClick={onClick}
            focused={player?.id == character.id}
        >
            <Box sx={{ width: "100%", gap: "2vw", alignItems: "center", userSelect: "none" }}>
                <img src={sprites[character.sprite as 1 | 2].pic} alt="picture" style={{ width: "2vw", flexShrink: 0 }} />

                <Box sx={{ width: "100%", justifyContent: "space-evenly" }}>
                    <SkillOrb label="Dex" attribute={character.attributes.dexterity} color="success" />
                    <SkillOrb label="Int" attribute={character.attributes.inteligence} color="info" />
                    <SkillOrb label="Str" attribute={character.attributes.strength} color="error" />
                    <SkillOrb label="Def" attribute={character.attributes.defence} color="warning" />
                </Box>

                <Box sx={{ gap: "1vw" }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ minWidth: 0, minHeight: 0, height: "2.5vw", width: "2.5vw" }}
                        onClick={handleSkills}
                    >
                        <CycloneIcon />
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ minWidth: 0, minHeight: 0, height: "2.5vw", width: "2.5vw" }}
                        onClick={handleInventory}
                    >
                        <AllInboxIcon />
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ minWidth: 0, minHeight: 0, height: "2.5vw", width: "2.5vw" }}
                        onClick={handleDelete}
                    >
                        <DeleteForeverIcon />
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}
