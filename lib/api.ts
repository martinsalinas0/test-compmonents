import axios, { type InternalAxiosRequestConfig } from "axios";
import { clientConfig } from "@/lib/config";
import { getAccessToken, clearAuth } from "@/lib/auth";

const api = axios.create({
  baseURL: clientConfig.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
      if (typeof window !== "undefined") {
        window.location.href = "/auth/sign-in?expired=1";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
