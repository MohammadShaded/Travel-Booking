import { userService } from '@/api/userService';
import { useFetchData } from '@/hooks/useFetchData';
import { useAuthStore } from '@/store/useAuthStore';
import type { RecentHotel } from '@/types';
import HotelCard from './HotelCard';
import styles from './RecentlyVisited.module.css';
import { MdHistory } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function RecentlyVisited() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.userId);
  const isLoggedIn = !!token;
  // Only fetch if user is logged in
  const {
    data: recentHotels,
    loading,
    error,
  } = useFetchData<RecentHotel[]>(
    () => (isLoggedIn ? userService.getRecentHotels(userId ? userId : 2) : Promise.resolve([])),
    [userId],
  );
  // Don't render anything if user is not logged in
  if (!isLoggedIn) {
    return null;
  }

  const handleHotelClick = (hotelId: number) => {
    const DateNow = new Date();

    navigate(`/hotel/${hotelId}?checkIn=${DateNow.toISOString().split('T')[0]}&checkOut=${new Date(DateNow.getTime() + 86400000).toISOString().split('T')[0]}`);
  };

  if (loading) {
    return (
      <section className={styles.recentlyVisited}>
        <div className={styles.container}>
          <div className={styles.header}>
            <MdHistory className={styles.headerIcon} />
            <h2 className={styles.title}>Recently Visited</h2>
          </div>
          <div className={styles.hotelsGrid}>
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
      <section className={styles.recentlyVisited}>
        <div className={styles.container}>
          <div className={styles.header}>
            <MdHistory className={styles.headerIcon} />
            <h2 className={styles.title}>Recently Visited</h2>
          </div>
          <p className={styles.error}>{error}</p>
        </div>
      </section>
    );
  }

  // Don't render if no recent hotels
  if (!recentHotels || recentHotels.length === 0) {
    return null;
  }

  return (
    <section className={styles.recentlyVisited}>
      <div className={styles.container}>
        <div className={styles.header}>
          <MdHistory className={styles.headerIcon} />
          <div>
            <h2 className={styles.title}>Recently Visited</h2>
            <p className={styles.subtitle}>Pick up where you left off</p>
          </div>
        </div>

        <div className={styles.hotelsGrid}>
          {recentHotels.map((hotel) => (
            <HotelCard 
              key={hotel.hotelId} 
              hotel={hotel} 
              onClick={() => handleHotelClick(hotel.hotelId)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
