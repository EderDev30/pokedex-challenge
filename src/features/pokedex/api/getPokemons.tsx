import { api } from "@/lib/apiClient";
import { queryOptions, useQuery } from "@tanstack/react-query";
import type {
  Pokemon,
  PokemonDTO,
  PokemonList,
  PokemonListResponse,
} from "../type/pokemon";
import { env } from "@/config/env";

const mapPokemonDTOToPokemon = (pokemon: PokemonDTO): Pokemon => {
  const pokemonId = pokemon.url.split("/").slice(-2, -1)[0];
  return {
    id: pokemonId,
    name: pokemon.name,
    url: pokemon.url,
    image: `${env.API_IMAGE_URL}/${pokemonId}.svg`,
  };
};

const formatPokemonResponse = (pokemon: PokemonListResponse): PokemonList => {
  return {
    total: pokemon.count,
    pokemons: pokemon.results.map(mapPokemonDTOToPokemon),
  };
};

export const getPokemons = async (): Promise<PokemonList> => {
  const response = await api.get<PokemonListResponse>(
    "/pokemon?offset=1&limit=20"
  );
  return formatPokemonResponse(response.data);
};

export const getPokemonsQueryOptions = () => {
  return queryOptions({
    queryKey: ["pokemons"],
    queryFn: () => getPokemons(),
  });
};

export const useGetPokemons = () => {
  return useQuery({
    ...getPokemonsQueryOptions(),
  });
};
