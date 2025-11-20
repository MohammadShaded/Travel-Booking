import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import ErrorMessage from '@/components/common/ErrorMessage';
import BrandSection from './components/BrandSection';
import LoginForm from './components/LoginForm';
import type { LoginCredentials } from '@/types';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract actions and state from store (each selector separately to avoid re-renders)
  const login = useAuthStore((state) => state.login);
  const clearError = useAuthStore((state) => state.clearError);
  const error = useAuthStore((state) => state.error);
  const isLoading = useAuthStore((state) => state.isLoading);

  const handleSubmit = async (values: LoginCredentials) => {
    clearError();
    try {
      await login(values);
      
      // Get the page they were trying to access before being redirected to login
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';
      
      // Redirect based on user type, or back to where they came from
      const userType = useAuthStore.getState().userType;
      if (userType === 'Admin') {
        navigate('/admin');
      } else {
        // For regular users, go back to the page they were trying to access
        navigate(from, { replace: true });
      }
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
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>Sign in to your account</p>
          </div>

          {error && <ErrorMessage message={error} onClose={() => clearError()} />}

          <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
