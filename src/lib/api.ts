// src/lib/api.ts
import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // example: http://localhost:8000
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export default api;
