import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router";
import { useGetPokemon } from "../api/getPokemon";
import { paths } from "@/config/paths";
import { useAuth } from "@/context/auth";
import { usePokemonStore } from "@/store/usePokemonStore";
import { Loading } from "@/components/loading/Loading";

export const PokemonDetail = () => {
  const { id } = useParams();
  const { data: pokemon, isFetching } = useGetPokemon(id || "");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toggleCapture, isCaptured } = usePokemonStore();

  if (!pokemon) return null;

  if (isFetching) {
    return <Loading />;
  }

  const captured = isCaptured(pokemon.id);

  const handleCapture = () => {
    toggleCapture(pokemon);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto mb-4 flex justify-between items-center">
        <Button variant="outline" onClick={() => navigate(paths.home)}>
          ← Back to Pokedex
        </Button>
        {isAuthenticated && (
          <Button
            onClick={handleCapture}
            variant={captured ? "destructive" : "default"}
          >
            {captured ? "Release Pokemon" : "Capture Pokemon"}
          </Button>
        )}
      </div>
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold capitalize">
            {pokemon.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-64 h-64 object-contain"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Types</h3>
              <div className="flex gap-2">
                {pokemon.types?.map((type) => (
                  <span
                    key={type.name}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize"
                  >
                    {type.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Base Experience</h3>
              <p className="text-gray-600">{pokemon.experience} XP</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Abilities</h3>
              <ul className="space-y-2">
                {pokemon.abilities?.map((ability) => (
                  <li key={ability.name} className="flex items-center gap-2">
                    <span className="capitalize">{ability.name}</span>
                    {ability.isHidden && (
                      <span className="text-xs text-gray-500">(Hidden)</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
