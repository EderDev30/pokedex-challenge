import type { Pokemon, PokemonDetail } from "@/features/pokedex/type/pokemon";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PokemonStore {
  capturedPokemons: Pokemon[];
  toggleCapture: (pokemon: Pokemon | PokemonDetail) => void;
  isCaptured: (pokemonId: number) => boolean;
}

export const usePokemonStore = create<PokemonStore>()(
  persist(
    (set, get) => ({
      capturedPokemons: [],
      toggleCapture: (pokemon) => {
        const { capturedPokemons } = get();
        const isPokemonCaptured = capturedPokemons.some(
          (p) => p.id === pokemon.id
        );

        if (isPokemonCaptured) {
          set({
            capturedPokemons: capturedPokemons.filter(
              (p) => p.id !== pokemon.id
            ),
          });
        } else {
          set({
            capturedPokemons: [...capturedPokemons, pokemon],
          });
        }
      },
      isCaptured: (pokemonId) => {
        return get().capturedPokemons.some((p) => p.id === pokemonId);
      },
    }),
    {
      name: "pokemon-storage",
    }
  )
);
