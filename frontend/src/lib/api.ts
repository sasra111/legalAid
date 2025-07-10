import axios from "axios";

import { useAuthStore } from "@/store/authStore";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token to every request if available
API.interceptors.request.use(
  (config) => {
    // Try zustand first, fallback to localStorage
    let token;
    try {
      // This will work only in React context, so fallback to localStorage for non-component code
      token = useAuthStore.getState().token;
    } catch {
      token = localStorage.getItem("token");
    }
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
