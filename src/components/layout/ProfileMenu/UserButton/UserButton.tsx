import { useState, useRef, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import styles from './UserButton.module.css';

export default function UserButton() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = !!token;
  const userName = useAuthStore((state) => state.userType);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  const handleBookingsClick = () => {
    setIsDropdownOpen(false);
  };

  if (!isLoggedIn) {
    return (
      <button className={styles.signInButton} onClick={handleSignInClick}>
        Sign In
      </button>
    );
  }

  return (
    <div className={styles.userButton} ref={dropdownRef}>
      <button
        className={styles.profileButton}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className={styles.avatarCircle}>
          <FaUser className={styles.userIcon} />
        </div>
        <span className={styles.userName}>{userName}</span>
      </button>

      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <button className={styles.dropdownItem} onClick={handleBookingsClick}>
            My Bookings
          </button>
          <div className={styles.dropdownDivider} />
          <button className={styles.dropdownItem} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
