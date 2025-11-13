import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      // 🟩 Login
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
          const { token, user } = res.data;
          set({ token, user });
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } catch (err: any) {
          set({ error: err.response?.data?.message || "Login failed" });
        } finally {
          set({ isLoading: false });
        }
      },

      // 🟦 Register
      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { name, email, password });
        } catch (err: any) {
          set({ error: err.response?.data?.message || "Registration failed" });
        } finally {
          set({ isLoading: false });
        }
      },

      // 🟥 Logout
      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
      },

      // 🟨 Auto-auth check (on refresh)
      checkAuth: async () => {
        const token = get().token;
        if (!token) return;
        try {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`);
          set({ user: res.data });
        } catch {
          set({ user: null, token: null });
        }
      },
      setToken: (token:string) => {
  localStorage.setItem("token", token);
  set({ token });
},

    }),
    {
      name: "auth-storage", // persist in localStorage
      partialize: (state) => ({ token: state.token, user: state.user }), // only persist these
    }
  )
);
