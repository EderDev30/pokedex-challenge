import { useAuth } from "@/context/auth";
import { usePokemonStore } from "@/store/usePokemonStore";
import { PokemonCard } from "../components/PokemonCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { paths } from "@/config/paths";

export const PokemonCaptured = () => {
  const { isAuthenticated } = useAuth();
  const { capturedPokemons } = usePokemonStore();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mb-4">
        <Button variant="outline" onClick={() => navigate(paths.home)}>
          ← Back to Pokedex
        </Button>
      </div>
      {isAuthenticated && capturedPokemons.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Captured Pokemon</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {capturedPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
