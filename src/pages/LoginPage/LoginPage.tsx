import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import ErrorMessage from '@/components/common/ErrorMessage';
import BrandSection from './components/BrandSection';
import LoginForm from './components/LoginForm';
import type { LoginCredentials } from '@/types';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const navigate = useNavigate();

  // Extract actions and state from store (each selector separately to avoid re-renders)
  const login = useAuthStore((state) => state.login);
  const clearError = useAuthStore((state) => state.clearError);
  const error = useAuthStore((state) => state.error);
  const isLoading = useAuthStore((state) => state.isLoading);

  const handleSubmit = async (values: LoginCredentials) => {
    clearError();
    try {
      await login(values);
      // Redirect based on user type
      const userType = useAuthStore.getState().userType;
      navigate(userType === 'Admin' ? '/admin' : '/');
    } catch {
      // Error is already set in the store by login()
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

          {error && <ErrorMessage message={error} onClose={() => clearError()} />}

          <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
