declare interface Resistance {
    physical: number
    magical: number
}

declare interface Regeneration {
    life: number
    mana: number
    stamina: number
    rage: number
}

declare interface Block {
    chance: number
    value: number
}

declare interface Critical {
    chance: number
    multiplier: number
}

declare interface Attack {
    speed: number
    range: number
    power: number
    magic: number
    critical: Critical
}

declare interface Stats {
    level: number
    speed: number

    maxLife: number
    maxStamina: number
    maxMana: number
    maxRage: number

    life: number
    stamina: number
    mana: number
    rage: number

    regeneration: Regeneration

    armor: number
    resistance: Resistance

    block: Block

    attack: Attack
}
