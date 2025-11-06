// src/store/useAuthStore.ts
import { create } from 'zustand';
import api from '@/api/axiosClient';
import type { LoginCredentials, AuthResponse } from '@/types';

interface AuthState {
  token: string | null;
  userType: 'User' | 'Admin' | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  setAuth: (token: string, userType: 'User' | 'Admin') => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userType: null,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post<AuthResponse>('/auth/authenticate', credentials);
      set({
        token: response.data.token,
        userType: response.data.userType,
        isLoading: false,
      });
    } catch (err) {
      // Error message is already user-friendly from axiosClient interceptor
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';

      set({
        error: errorMessage,
        isLoading: false,
      });
      throw err;
    }
  },

  logout: () => set({ token: null, userType: null, error: null, isLoading: false }),
  setAuth: (token, userType) => set({ token, userType }),
  clearError: () => set({ error: null }),
}));
