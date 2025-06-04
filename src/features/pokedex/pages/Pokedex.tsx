import { Loading } from "@/components/loading/Loading";
import { useGetPokemons } from "../api/getPokemons";
import { PokemonCard } from "../components/PokemonCard";

export const Pokedex = () => {
  const { data: Pokemons, isFetching } = useGetPokemons();

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">All Pokemon</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Pokemons?.pokemons?.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};
