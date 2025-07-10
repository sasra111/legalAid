import { create } from "zustand";

interface User {
  email: string;
  role: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  clearUser: () => void;
}

const getInitialAuth = (): { token: string | null; user: User | null } => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token && user) {
    // Check if session is still valid (24h)
    const sessionTime = localStorage.getItem("sessionTime");
    if (
      sessionTime &&
      sessionTime !== null &&
      Date.now() - parseInt(sessionTime, 10) < 24 * 60 * 60 * 1000
    ) {
      return { token, user: JSON.parse(user) };
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("sessionTime");
    }
  }
  return { token: null, user: null };
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialAuth(),
  setUser: (user: User, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("sessionTime", Date.now().toString());
    set({ user, token });
  },
  clearUser: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("sessionTime");
    set({ user: null, token: null });
  },
}));
