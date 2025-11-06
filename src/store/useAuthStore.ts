// src/store/useAuthStore.ts
import { create } from 'zustand';
import api from '@/api/axiosClient';
import type { LoginCredentials, AuthResponse } from '@/types';

interface AuthState {
  token: string | null;
  userType: 'user' | 'admin' | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  setAuth: (token: string, userType: 'user' | 'admin') => void;
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
        isLoading: false 
      });
    } catch (err: any) {
      set({ 
        error: err.response?.data?.message || 'Login failed.',
        isLoading: false 
      });
      throw err;
    }
  },
  
  logout: () => set({ token: null, userType: null }),
  setAuth: (token, userType) => set({ token, userType }),
  clearError: () => set({ error: null }),
}));