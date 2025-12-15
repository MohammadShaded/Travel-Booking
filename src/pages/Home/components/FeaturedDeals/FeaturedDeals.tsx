import { useQuery } from '@tanstack/react-query';
import { homeService } from '@/api/homeService';
import type { FeaturedDeal } from '@/types';
import DealCard from './DealCard';
import styles from './FeaturedDeals.module.css';
import { useNavigate } from 'react-router-dom';

export default function FeaturedDeals({ isScrolled }: { isScrolled: boolean }) {
  const {
    data: deals,
    isLoading: loading,
    error,
  } = useQuery<FeaturedDeal[]>({
    queryKey: ['featuredDeals'],
    queryFn: homeService.getFeaturedDeals,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
  const navigate = useNavigate();

  const handleDealClick = (hotelId: number) => {
    navigate(`/hotel/${hotelId}`);
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
          <p className={styles.error}>Failed to load featured deals</p>
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
