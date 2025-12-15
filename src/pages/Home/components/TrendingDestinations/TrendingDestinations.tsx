import { useQuery } from '@tanstack/react-query';
import { homeService } from '@/api/homeService';
import type { TrendingDestination } from '@/types';
import DestinationCard from './DestinationCard';
import styles from './TrendingDestinations.module.css';
import { MdTrendingUp } from 'react-icons/md';
import { useNavigate } from 'react-router';


export default function TrendingDestinations() {
  const navigate = useNavigate();

  const {
    data: destinations,
    isLoading: loading,
    error,
  } = useQuery<TrendingDestination[]>({
    queryKey: ['trendingDestinations'],
    queryFn: homeService.getTrendingDestinations,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const handleDestinationClick = (cityName: string) => {
    navigate(`/search?city=${cityName}`);
  };

  if (loading) {
    return (
      <section className={styles.trendingDestinations}>
        <div className={styles.container}>
          <div className={styles.header}>
            <MdTrendingUp className={styles.headerIcon} />
            <h2 className={styles.title}>Trending Destinations</h2>
          </div>
          <div className={styles.destinationsGrid}>
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
      <section className={styles.trendingDestinations}>
        <div className={styles.container}>
          <div className={styles.header}>
            <MdTrendingUp className={styles.headerIcon} />
            <h2 className={styles.title}>Trending Destinations</h2>
          </div>
          <p className={styles.error}>Failed to load trending destinations</p>
        </div>
      </section>
    );
  }

  if (!destinations || destinations.length === 0) {
    return null;
  }

  return (
    <section className={styles.trendingDestinations}>
      <div className={styles.container}>
        <div className={styles.header}>
          <MdTrendingUp className={styles.headerIcon} />
          <div>
            <h2 className={styles.title}>Trending Destinations</h2>
            <p className={styles.subtitle}>Discover the hottest travel spots right now</p>
          </div>
        </div>

        <div className={styles.destinationsGrid}>
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.cityId}
              destination={destination}
              onClick={() => handleDestinationClick(destination.cityName)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
