import Logo from '@/components/common/Logo';
import ProfileMenu from '@/components/layout/ProfileMenu';
import SearchBar from '../SearchBar';
import { MdKeyboardArrowDown, MdFlight, MdHotel, MdExplore } from 'react-icons/md';
import styles from './Hero.module.css';

export default function Hero({ isScrolled }: { isScrolled: boolean }) {

  function handleExploreMore(): void {
    // Scroll to the next section smoothly
       window.scrollTo(0, 90);
  }

  return (
    <div className={`${styles.hero} ${isScrolled ? styles.heroCompact : ''}`}>
      {/* Decorative floating icons */}
      {!isScrolled && (
        <div className={styles.decorativeIcons}>
          <MdFlight className={`${styles.floatingIcon} ${styles.iconPlane}`} />
          <MdHotel className={`${styles.floatingIcon} ${styles.iconHotel}`} />
          <MdExplore className={`${styles.floatingIcon} ${styles.iconCompass}`} />
        </div>
      )}

      {/* Top bar with Logo and Profile */}
      <div className={styles.topBar}>
        <Logo size="medium" variant="default" />
        
        <div className={styles.topBarRight}>
          <ProfileMenu />
        </div>
      </div>

      {/* Center content - Text and Search */}
      <div className={styles.content}>
        {/* Hero Text */}
        <div className={`${styles.heroText} ${isScrolled ? styles.heroTextHidden : ''}`}>
          <h1 className={styles.title}>Find Your Perfect Stay</h1>
          <p className={styles.subtitle}>
            Discover amazing hotels and accommodations around the world
          </p>
        </div>

        {/* Search Box */}
        <div className={styles.searchBox}>
          <SearchBar isCompact={isScrolled} />
        </div>
      </div>

      {/* Scroll Indicator */}
      {!isScrolled && (
        <div className={styles.scrollIndicator} onClick={handleExploreMore}>
          <span className={styles.scrollText}>Explore Deals Below</span>
          <MdKeyboardArrowDown className={styles.scrollArrow} />
        </div>
      )}
    </div>
  );
}
