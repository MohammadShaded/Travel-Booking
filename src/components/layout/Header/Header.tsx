import Logo from '@/components/common/Logo';
import ProfileMenu from '@/components/layout/ProfileMenu';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink} aria-label="Home">
          <Logo size="medium" variant="default" />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <Link 
            to="/" 
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/hotels" 
            className={`${styles.navLink} ${isActive('/hotels') ? styles.active : ''}`}
          >
            Hotels
          </Link>
          <Link 
            to="/my-bookings" 
            className={`${styles.navLink} ${isActive('/my-bookings') ? styles.active : ''}`}
          >
            My Bookings
          </Link>
        </nav>

        <ProfileMenu />
      </div>
    </header>
  );
}
