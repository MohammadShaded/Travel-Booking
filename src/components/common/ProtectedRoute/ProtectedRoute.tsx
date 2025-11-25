import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean; // If true, requires userType === 'Admin'
  requireUser?: boolean; // If true, requires userType === 'User'
}

const ProtectedRoute = ({ children, requireAdmin = false, requireUser = false }: ProtectedRouteProps) => {
  const token = useAuthStore((state) => state.token);
  const userType = useAuthStore((state) => state.userType);
  const location = useLocation();

  if (!token) {
    // Redirect to login page, but save the attempted location
    // so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admin-only route protection
  if (requireAdmin && userType !== 'Admin') {
    // Non-admin users trying to access admin pages get redirected to home
    return <Navigate to="/" replace />;
  }

  // User-only route protection
  if (requireUser && userType !== 'User') {
    // Admin users trying to access user pages get redirected to admin
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
