import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/api/axiosClient';
import ErrorMessage from '@/components/common/ErrorMessage';
import BrandSection from './components/BrandSection';
import LoginForm from './components/LoginForm';
import type { LoginCredentials, AuthResponse } from '@/types';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: LoginCredentials) => {
    setIsLoading(true);
    setError('');
    console.log('Submitting login with values: ', values);
    try {
      // API call to login endpoint
      const response = await api.post<AuthResponse>('/auth/authenticate', values);
      console.log('Login response: ', response.data);
      // Store token and user type in Zustand store
      setAuth(response.data.token, response.data.userType);

      // Redirect based on user type
      if (response.data.userType === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.leftSection}>
        <BrandSection />
      </div>

      <div className={styles.rightSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Welcome Back!</h1>
            <p className={styles.subtitle}>Sign in to continue your journey</p>
          </div>

          {error && <ErrorMessage message={error} onClose={() => setError('')} />}

          <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <div className={styles.footer}>
            <p>
              Don't have an account? <a href="/register">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
