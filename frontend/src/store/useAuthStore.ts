import { create } from "zustand";

interface AuthState {
  user: string | null;
  token: string | null;
  setToken: (token: string) => void;
  login: (user: string, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  login: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  }
}));
