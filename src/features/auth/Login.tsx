import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { paths } from "@/config/paths";
import { useAuth } from "@/context/auth";
import { Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

interface LocationState {
  from?: string;
}

export const Login = () => {
  const { loginFn, isAuthenticating } = useAuth();
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as LocationState)?.from || paths.home;

  const onSuccess = () => {
    navigate(from, { replace: true });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginFn(user, onSuccess);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-[400px] mx-auto">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user">User</Label>
              <Input
                id="user"
                type="user"
                placeholder="Enter your user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                className="w-full"
                disabled={isAuthenticating}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isAuthenticating}
            >
              {isAuthenticating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
