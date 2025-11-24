import Logo from '@/components/common/Logo';
import ProfileMenu from '@/components/layout/ProfileMenu';
import { useAuthStore } from '@/store/useAuthStore';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  const location = useLocation();
  const userType = useAuthStore((state) => state.userType);
  const isAdmin = userType === 'Admin';

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={isAdmin ? '/admin' : '/'} className={styles.logoLink} aria-label="Home">
          <Logo size="medium" variant="default" />
        </Link>

        {!isAdmin && (
          <nav className={styles.nav} aria-label="Main navigation">
            <Link to="/" className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}>
              Home
            </Link>
            <Link
              to="/search"
              className={`${styles.navLink} ${isActive('/search') ? styles.active : ''}`}
            >
              Hotels
            </Link>
          </nav>
        )}

        <ProfileMenu />
      </div>
    </header>
  );
}
