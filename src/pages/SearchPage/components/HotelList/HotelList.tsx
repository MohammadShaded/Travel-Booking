import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import HotelCard from './HotelCard';
import HotelCardSkeleton from './HotelCard/HotelCardSkeleton';
import type { SearchResult } from '@/types';
import styles from './HotelList.module.css';

export interface HotelListProps {
  /**
   * Array of hotel search results
   */
  hotels: SearchResult[];
  /**
   * Loading state
   */
  isLoading?: boolean;
  /**
   * Has more results to load
   */
  hasMore: boolean;
  /**
   * Load more results callback
   */
  onLoadMore: () => void;
}

const HotelList: React.FC<HotelListProps> = ({
  hotels,
  isLoading = false,
  hasMore,
  onLoadMore,
}) => {
  if (isLoading && hotels.length === 0) {
    return (
      <div className={styles.hotelList}>
        {Array.from({ length: 5 }).map((_, index) => (
          <HotelCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🏨</div>
        <h3 className={styles.emptyTitle}>No hotels found</h3>
        <p className={styles.emptyDescription}>
          Try adjusting your search criteria or filters
        </p>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={hotels.length}
      next={onLoadMore}
      hasMore={hasMore}
      loader={
        <div className={styles.loaderContainer}>
          <HotelCardSkeleton />
        </div>
      }
      endMessage={
        <p className={styles.endMessage}>
          You've seen all {hotels.length} hotels
        </p>
      }
      className={styles.hotelList}
    >
      {hotels.map((hotel, index) => (
        <HotelCard
          key={`${hotel.hotelId}-${index}`}
          hotelId={hotel.hotelId}
          hotelName={hotel.hotelName}
          location={hotel.cityName}
          imageUrl={hotel.roomPhotoUrl}
          starRating={hotel.starRating}
          price={hotel.roomPrice}
          roomType={hotel.roomType}
          discount={hotel.discount * 100}
          amenities={hotel.amenities.map(a => a.name)}
        />
      ))}
    </InfiniteScroll>
  );
};

export default HotelList;
