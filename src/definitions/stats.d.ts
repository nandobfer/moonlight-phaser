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

declare interface Resource {
    current: number
    max: number
}

declare interface Stats {
    level: number
    speed: number

    life: Resource
    stamina: Resource
    mana: Resource
    rage: Resource

    regeneration: Regeneration

    armor: number
    resistance: Resistance

    block: Block

    attack: Attack
}
