import { login } from "@/api/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  loginFn: (email: string, onSuccess: () => void) => void;
  logoutFn: () => void;
  isAuthenticating: boolean;
  user: string;
}

const defaultUser = "Visitante";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [user, setUser] = useState<string>(defaultUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setUser(token ?? defaultUser);
  }, []);

  const loginFn = async (user: string, onSuccess: () => void) => {
    setIsAuthenticating(true);
    try {
      const response = await login(user);
      localStorage.setItem("token", response.token);
      setIsAuthenticated(true);
      setUser(user);
      onSuccess();
    } catch (error) {
      console.error("Error de inicio de sesión", error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logoutFn = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(defaultUser);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loginFn,
        logoutFn,
        isAuthenticating,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
