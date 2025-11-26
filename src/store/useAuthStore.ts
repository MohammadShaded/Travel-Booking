// src/store/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/api/axiosClient';
import type { LoginCredentials, AuthResponse } from '@/types';

interface AuthState {
  token: string | null;
  userType: 'User' | 'Admin' | null;
  userId: number | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  setAuth: (token: string, userType: 'User' | 'Admin', userId?: number) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userType: null,
      userId: null,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post<AuthResponse>('/auth/authenticate', credentials);
          const token = response.data.authentication;

          set({
            token,
            userType: response.data.userType,
            userId: response.data.userId ?? null,
            isLoading: false,
          });
        } catch (err) {
          // Error message is already user-friendly from axiosClient interceptor
          const errorMessage =
            err instanceof Error ? err.message : 'Something went wrong. Please try again.';

          set({
            error: errorMessage,
            isLoading: false,
          });
          throw err;
        }
      },

      logout: () => {
        set({ token: null, userType: null, userId: null, error: null, isLoading: false });
      },

      setAuth: (token, userType, userId) => {
        set({ token, userType, userId: userId ?? null });
      },
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);
