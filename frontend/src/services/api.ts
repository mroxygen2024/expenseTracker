import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    // If headers are undefined, initialize them as AxiosHeaders
    if (!config.headers) {
      config.headers = new axios.AxiosHeaders(); // ✅ use AxiosHeaders instead of {}
    }

    // set the Authorization header
    if ("set" in config.headers) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
