import { homeService } from '@/api/homeService';
import { useFetchData } from '@/hooks/useFetchData';
import type { FeaturedDeal } from '@/types';
import DealCard from './DealCard';
import styles from './FeaturedDeals.module.css';
import { MdArrowForward } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function FeaturedDeals({ isScrolled }: { isScrolled: boolean }) {
  const {
    data: deals,
    loading,
    error,
  } = useFetchData<FeaturedDeal[]>(homeService.getFeaturedDeals);
  const navigate = useNavigate();

  const handleDealClick = (hotelId: number) => {
    navigate(`/hotels/${hotelId}`);
  };

  if (loading) {
    return (
      <section
        className={`${styles.featuredDeals} ${isScrolled ? styles.scrolledFeaturedDeals : ''}`}
      >
        <div className={styles.container}>
          <h2 className={styles.title}>Featured Deals</h2>
          <div className={styles.loadingGrid}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.skeletonCard}></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.featuredDeals}>
        <div className={styles.container}>
          <h2 className={styles.title}>Featured Deals</h2>
          <p className={styles.error}>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.featuredDeals}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Featured Deals</h2>
            <p className={styles.subtitle}>Exclusive offers you won't want to miss</p>
          </div>
          <button className={styles.viewAllButton}>
            View All Deals
            <MdArrowForward />
          </button>
        </div>

        <div className={styles.dealsGrid}>
          {deals &&
            deals.map((deal) => (
              <DealCard
                key={deal.hotelId}
                deal={deal}
                onClick={handleDealClick}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
