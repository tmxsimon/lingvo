import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api, { setAuthToken } from "../../../lib/api";
import type { UserType } from "../types";
import { fetchMe } from "../services";
import clearLocalStorage from "../../../utils/clearLocalStorage";

type AuthContextType = {
  user: UserType | null;
  isLoading: boolean;
  error: Error | null;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AUTH_TOKEN_KEY = "accessToken";
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const PATH = "/users";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchMe(),
    enabled: !!token,
    retry: false,
  });

  const signInMutation = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const form = new URLSearchParams();
      form.append("username", username);
      form.append("password", password);

      const response = await api.post("/users/token", form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const accessToken = response.data.access_token;
      localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
      setAuthToken(accessToken);

      return accessToken;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const form = new FormData();
      form.append("username", username);
      form.append("password", password);

      return api.post(`${PATH}/`, form);
    },
  });

  const signIn = async (username: string, password: string) => {
    await signInMutation.mutateAsync({ username, password });
    clearLocalStorage();
  };

  const signUp = async (username: string, password: string) => {
    await signUpMutation.mutateAsync({ username, password });
    await signIn(username, password);
  };

  const signOut = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setAuthToken();
    clearLocalStorage();
    queryClient.setQueryData(["user"], null);
  };

  const value = useMemo(
    () => ({
      user: user || null,
      isLoading,
      error,
      signIn,
      signUp,
      signOut,
    }),
    [user, isLoading, error, refetch],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
