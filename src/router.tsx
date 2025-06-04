import { MainLayout } from "@/components/layouts/MainLayout";
import { paths } from "@/config/paths";
import { Login } from "@/features/auth/Login";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Pokedex, PokemonCaptured, PokemonDetail } from "@/features/pokedex";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

export const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: paths.home,
      element: (
        <MainLayout>
          <Pokedex />
        </MainLayout>
      ),
    },
    {
      path: `${paths.pokemon}/:id`,
      element: (
        <MainLayout>
          <PokemonDetail />
        </MainLayout>
      ),
    },
    {
      path: `${paths.pokemonCaptured}`,
      element: (
        <ProtectedRoute>
          <MainLayout>
            <PokemonCaptured />
          </MainLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: paths.login,
      element: <Login />,
    },
  ]);
};

export const AppRouter = () => {
  const router = createAppRouter();

  return <RouterProvider router={router} />;
};
