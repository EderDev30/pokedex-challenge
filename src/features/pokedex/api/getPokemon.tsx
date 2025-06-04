import { api } from "@/lib/apiClient";
import { queryOptions, useQuery } from "@tanstack/react-query";
import type {
  PokemonAbility,
  PokemonAbilityDTO,
  PokemonDetail,
  PokemonDetailDTO,
  PokemonType,
  PokemonTypeDTO,
} from "../type/pokemon";
import { env } from "@/config/env";

const mapPokemonAbilityDTOToAbility = (
  ability: PokemonAbilityDTO
): PokemonAbility => {
  return {
    name: ability.ability.name,
    url: ability.ability.url,
    isHidden: ability.is_hidden,
  };
};

const mapPokemonTypeDTOToType = (type: PokemonTypeDTO): PokemonType => {
  return {
    name: type.type.name,
    url: type.type.url,
  };
};

const formatPokemonResponse = (
  pokemonDetail: PokemonDetailDTO
): PokemonDetail => {
  return {
    id: Number(pokemonDetail.id),
    url: "",
    name: pokemonDetail.name,
    experience: pokemonDetail.base_experience,
    abilities: pokemonDetail.abilities.map(mapPokemonAbilityDTOToAbility),
    types: pokemonDetail.types.map(mapPokemonTypeDTOToType),
    image: `${env.API_IMAGE_URL}/${pokemonDetail.id}.svg`,
  };
};

export const getPokemon = async (id: string): Promise<PokemonDetail> => {
  const response = await api.get<PokemonDetailDTO>(`/pokemon/${id}/`);
  return formatPokemonResponse(response.data);
};

export const getPokemonQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["pokemons"],
    queryFn: () => getPokemon(id),
  });
};

export const useGetPokemon = (id: string) => {
  return useQuery({
    ...getPokemonQueryOptions(id),
    // enabled: !!id,
  });
};
