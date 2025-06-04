import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { useNavigate } from "react-router";

export const Header = () => {
  const { isAuthenticated, logoutFn, user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between gap-4 p-4">
      <div>
        <Button onClick={() => navigate(paths.pokemonCaptured)}>
          Your Pokemons
        </Button>
      </div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg">
          Bienvenido, <span className="font-medium">{user}</span>
        </h2>
        {isAuthenticated ? (
          <Button onClick={logoutFn} variant="outline">
            Logout
          </Button>
        ) : (
          <Button onClick={() => navigate(paths.login)}>Login</Button>
        )}
      </div>
    </header>
  );
};
