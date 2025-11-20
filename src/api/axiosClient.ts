import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Get token directly from Zustand store (single source of truth)
    const token = useAuthStore.getState().token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response, // Pass successful responses through
  (error) => {
    // Transform axios errors to user-friendly messages
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      const serverMessage = error.response.data?.message;

      // Handle authentication errors - logout user on 401/403
      if (status === 401 || status === 403) {
        const authStore = useAuthStore.getState();
        
        // Only logout if user was actually logged in (has a token)
        if (authStore.token) {
          // Clear auth state
          authStore.logout();
          
          // Show session expired message
          error.message = 'Your session has expired. Please log in again.';
          
          // Redirect to login page after a short delay
          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
          
          return Promise.reject(error);
        }
        
        // If no token, it's a regular 401 (invalid credentials)
        error.message = status === 401 
          ? 'Invalid username or password. Please try again.'
          : 'Access denied. You do not have permission.';
        return Promise.reject(error);
      }

      // User-friendly messages based on status code
      let userMessage: string;

      switch (status) {
        case 404:
          userMessage = 'Resource not found.';
          break;
        case 500:
          userMessage = 'Server error. Please try again later.';
          break;
        default:
          userMessage = serverMessage || 'Something went wrong. Please try again.';
      }

      // Attach user-friendly message to error
      error.message = userMessage;
    } else {
      // Network error or other issues
      error.message = 'Network error. Please check your connection.';
    }

    return Promise.reject(error);
  },
);

export default api;
