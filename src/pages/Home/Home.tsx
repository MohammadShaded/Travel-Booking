import Hero from './components/Hero';
import FeaturedDeals from './components/FeaturedDeals';
import RecentlyVisited from './components/RecentlyVisited';
import TrendingDestinations from './components/TrendingDestinations';
import styles from './Home.module.css';
import { useScroll } from '@/hooks/useScroll';

export default function Home() {
  const { isScrolled } = useScroll(80); 

  return (
    <div className={styles.home}>
      <Hero isScrolled={isScrolled} />
      
      {/* Content sections */}
      <div className={styles.contentSections + (isScrolled ? ' ' + styles.scrolledContentSections : '')}>
        <FeaturedDeals isScrolled={isScrolled}  />
        
        {/* Recently Visited Hotels (only shown if user is logged in) */}
        <RecentlyVisited />
        
        {/* Trending Destinations */}
        <TrendingDestinations />
      </div>
    </div>
  );
}
