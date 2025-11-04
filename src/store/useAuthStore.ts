// src/store/useAuthStore.ts
import { create } from "zustand";

interface AuthState {
  token: string | null;
  userType: "user" | "admin" | null;
  setAuth: (token: string, type: "user" | "admin") => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userType: null,
  setAuth: (token, type) => set({ token, userType: type }),
  logout: () => set({ token: null, userType: null }),
}));
