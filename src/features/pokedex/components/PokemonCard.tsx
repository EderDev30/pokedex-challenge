import { useNavigate } from "react-router";
import type { Pokemon } from "../type/pokemon";
import { paths } from "@/config/paths";
import { useAuth } from "@/context/auth";
import { usePokemonStore } from "@/store/usePokemonStore";
import { Button } from "@/components/ui/button";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toggleCapture, isCaptured } = usePokemonStore();
  const captured = isCaptured(Number(pokemon.id));

  const handleClick = () => {
    navigate(`${paths.pokemon}/${pokemon.id}`);
  };

  const handleCapture = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCapture(pokemon);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative"
    >
      <div className="p-4 flex flex-col items-center">
        <div className="w-32 h-32 flex items-center justify-center">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="object-contain w-full h-full"
            loading="lazy"
          />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-800 capitalize">
          {pokemon.name}
        </h3>
        {isAuthenticated && (
          <Button
            onClick={handleCapture}
            className="mt-2"
            variant={captured ? "destructive" : "default"}
          >
            {captured ? "Release" : "Capture"}
          </Button>
        )}
      </div>
    </div>
  );
};
