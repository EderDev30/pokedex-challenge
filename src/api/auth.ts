import type { ILoginResponse } from "@/types/auth";

export const login = async (email: string): Promise<ILoginResponse> => {
  return {
    token: email,
  };
};
