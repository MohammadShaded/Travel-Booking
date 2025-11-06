import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response, // Pass successful responses through
  (error) => {
    // Transform axios errors to user-friendly messages
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      const serverMessage = error.response.data?.message;

      // User-friendly messages based on status code
      let userMessage: string;

      switch (status) {
        case 401:
          userMessage = 'Invalid username or password. Please try again.';
          break;
        case 403:
          userMessage = 'Access denied. You do not have permission.';
          break;
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
  }
);

export default api;
