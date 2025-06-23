export interface PokemonInfiniteQuery {
  results: PokemonListItem[]
  nextOffset: number
  hasMore: boolean
}

export interface PokemonDescriptionInfo {
  name: keyof Pokemon
  label: string
  format?: (value: TData) => string
}

export interface PokemonResponseList {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonListItem {
  name: string
}

export interface Pokemon {
  id: number | null
  name: string | null
  height: number | null
  weight: number | null
  types: Type[]
  image?: string
}

export interface PokemonResponse {
  abilities: Ability[]
  baseExperience: number
  cries: Cries
  forms: Species[]
  gameIndices: GameIndex[]
  height: number
  heldItems: HeldItem[]
  id: number
  isDefault: boolean
  locationAreaEncounters: string
  moves: Move[]
  name: string
  order: number
  pastAbilities: PastAbility[]
  pastTypes: PokemonTypePast[]
  species: Species
  sprites: Sprites
  stats: Stat[]
  types: Type[]
  weight: number
}

interface PokemonTypePast {
  generation: Species
  types: Type[]
}

interface Ability {
  ability: Species | null
  isHidden: boolean
  slot: number
}

interface Species {
  name: string
  url: string
}

interface Cries {
  latest: string
  legacy: string
}

interface GameIndex {
  gameIndex: number
  version: Species
}

interface HeldItem {
  item: Species
  versionDetails: VersionDetail[]
}

interface VersionDetail {
  rarity: number
  version: Species
}

interface Move {
  move: Species
  versionGroupDetails: VersionGroupDetail[]
}

interface VersionGroupDetail {
  levelLearnedAt: number
  moveLearnMethod: Species
  order: null
  versionGroup: Species
}

interface PastAbility {
  abilities: Ability[]
  generation: Species
}

interface GenerationV {
  blackWhite: Sprites
}

interface GenerationIv {
  diamondPearl: Sprites
  heartgoldSoulsilver: Sprites
  platinum: Sprites
}

interface Versions {
  generationI: GenerationI
  generationIi: GenerationIi
  generationIii: GenerationIii
  generationIv: GenerationIv
  generationV: GenerationV
  generationVi: { [key: string]: Home }
  generationVii: GenerationVii
  generationViii: GenerationViii
}

interface Other {
  dreamWorld: DreamWorld
  home: Home
  'official-artwork': OfficialArtwork
  showdown: Sprites
}

interface Sprites {
  backDefault: string
  backFemale: null
  backShiny: string
  backShinyFemale: null
  frontDefault: string
  frontFemale: null
  frontShiny: string
  frontShinyFemale: null
  other?: Other
  versions?: Versions
  animated?: Sprites
}

interface GenerationI {
  redBlue: RedBlue
  yellow: RedBlue
}

interface RedBlue {
  backDefault: string
  backGray: string
  backTransparent: string
  frontDefault: string
  frontGray: string
  frontTransparent: string
}

interface GenerationIi {
  crystal: Crystal
  gold: Gold
  silver: Gold
}

interface Crystal {
  backDefault: string
  backShiny: string
  backShinyTransparent: string
  backTransparent: string
  frontDefault: string
  frontShiny: string
  frontShinyTransparent: string
  frontTransparent: string
}

interface Gold {
  backDefault: string
  backShiny: string
  frontDefault: string
  frontShiny: string
  frontTransparent?: string
}

interface GenerationIii {
  emerald: OfficialArtwork
  fireredLeafgreen: Gold
  rubySapphire: Gold
}

interface OfficialArtwork {
  front_default: string
  frontShiny: string
}

interface Home {
  frontDefault: string
  frontFemale: null
  frontShiny: string
  frontShinyFemale: null
}

interface GenerationVii {
  icons: DreamWorld
  ultraSunUltraMoon: Home
}

interface DreamWorld {
  frontDefault: string
  frontFemale: null
}

interface GenerationViii {
  icons: DreamWorld
}

interface Stat {
  baseStat: number
  effort: number
  stat: Species
}

export interface Type {
  slot: number
  type: Species
}
