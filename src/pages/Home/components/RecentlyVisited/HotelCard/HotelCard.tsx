import { MdStar, MdLocationOn } from 'react-icons/md';
import type { RecentHotel } from '@/types';
import styles from './HotelCard.module.css';

interface HotelCardProps {
  hotel: RecentHotel;
  onClick: (hotelId: number) => void;
}

 
export default function HotelCard({ hotel, onClick }: HotelCardProps) {
  // Format the visit date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div
      className={styles.hotelCard}
      onClick={() => onClick(hotel.hotelId)}
    >
      {/* Thumbnail Image */}
      <div className={styles.imageContainer}>
        <img 
          src={hotel.thumbnailUrl} 
          alt={hotel.hotelName} 
          className={styles.image} 
        />
      </div>

      {/* Hotel Details */}
      <div className={styles.content}>
        {/* Hotel Name */}
        <h3 className={styles.hotelName}>{hotel.hotelName}</h3>

        {/* Location */}
        <div className={styles.location}>
          <MdLocationOn className={styles.locationIcon} />
          <span>{hotel.cityName}</span>
        </div>

        {/* Star Rating */}
        <div className={styles.rating}>
          {Array.from({ length: hotel.starRating }).map((_, i) => (
            <MdStar key={i} className={styles.starIcon} />
          ))}
        </div>

        {/* Price Range */}
        <div className={styles.priceRange}>
          <span className={styles.priceLabel}>Price Range:</span>
          <span className={styles.price}>
            ${hotel.priceLowerBound} - ${hotel.priceUpperBound}
          </span>
        </div>

        {/* Visit Date */}
        <p className={styles.visitDate}>Visited {formatDate(hotel.visitDate)}</p>
      </div>
    </div>
  );
}
