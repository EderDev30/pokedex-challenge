import { useAuth } from "@/context/auth";
import { paths } from "@/config/paths";
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login but save the attempted location to redirect back after login
    return (
      <Navigate to={paths.login} state={{ from: location.pathname }} replace />
    );
  }

  return children;
};
