export const useAttributesMods = () => {
    const defMods = (stats: Stats, def: number) => {
        stats.life.max = stats.base.life.max + 10 * def
        stats.regeneration.life = stats.base.regeneration.life + 0.01 * def
        stats.armor = stats.base.armor + 1 + def
        stats.resistance.physical = stats.base.resistance.physical + def / 10
        stats.resistance.magical = stats.base.resistance.magical + def / 10
    }

    const dexMods = (stats: Stats, dex: number) => {
        stats.regeneration.stamina = stats.base.regeneration.stamina + 0.05 * dex
        stats.attack.speed = stats.base.attack.speed + 1 * dex
    }

    const intMods = (stats: Stats, int: number) => {
        stats.mana.max = stats.base.mana.max + 10 * int
        stats.regeneration.mana = stats.base.regeneration.mana + 0.1 * int
        stats.attack.magic = stats.base.attack.magic + 1 * int
    }

    const strMods = (stats: Stats, str: number) => {
        stats.rage.max = stats.base.rage.max + 0.1 * str
        stats.attack.power = stats.base.attack.power + 1 * str
    }

    const applyAttributes = (player: Character) => {
        const stats = player.stats
        defMods(stats, player.attributes.defence)
        dexMods(stats, player.attributes.dexterity)
        intMods(stats, player.attributes.inteligence)
        strMods(stats, player.attributes.strength)

        return stats
    }

    return applyAttributes
}

// life: {
//     current: 20,
//     max: 100 + 10 * def,
// },
// rage: {
//     current: 80,
//     max: 100 + 0.1 * str,
// },
// stamina: {
//     current: 20,
//     max: 100,
// },
// mana: {
//     current: 20,
//     max: 100 + 10 * int,
// },

// regeneration: {
//     life: 1 + 0.01 * def,
//     rage: -1,
//     stamina: 10 + 0.05 * dex,
//     mana: 2 + 0.1 * int,
// },

// armor: 0,
// resistance: {
//     magical: 0 + def / 10,
//     physical: 0 + def / 10,
// },

// block: {
//     chance: 0,
//     value: 0,
// },

// attack: {
//     speed: 1 + dex,
//     range: 1,
//     power: 1 + str,
//     magic: 1 + int,
//     critical: {
//         chance: 10,
//         multiplier: 2,
//     },
// },
