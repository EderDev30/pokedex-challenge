export interface PokemonDTO {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonDTO[];
}

export interface PokemonList {
  total: number;
  pokemons: Pokemon[];
}

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  image: string;
}

export interface PokemonAbilityDTO {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonTypeDTO {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonDetailDTO {
  id: number;
  name: string;
  base_experience: number;
  abilities: PokemonAbilityDTO[];
  types: PokemonTypeDTO[];
}

export interface PokemonDetail extends Pokemon {
  experience: number;
  abilities: PokemonAbility[];
  types: PokemonType[];
}

export interface PokemonAbility {
  name: string;
  url: string;
  isHidden: boolean;
}

export interface PokemonType {
  name: string;
  url: string;
}
