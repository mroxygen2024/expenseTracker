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
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
        if (!token || !user) throw new Error("Invalid login response");
        set({ token, user });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (err: any) {
        set({ error: err.response?.data?.message || "Login failed" });
        throw err; // ✅ Throw so the caller knows login failed
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
        axios.defaults.headers.common["Authorization"] = "";
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
