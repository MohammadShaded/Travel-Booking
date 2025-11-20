import { MdStar } from 'react-icons/md';
import type { FeaturedDeal } from '@/types';
import styles from './DealCard.module.css';

interface DealCardProps {
  deal: FeaturedDeal;
  onClick: (hotelId: number) => void;
}

export default function DealCard({ deal, onClick }: DealCardProps) {
  return (
    <div
      className={styles.dealCard}
      onClick={() => onClick(deal.hotelId)}
    >
      {/* Image Container */}
      <div className={styles.imageContainer}>
        <img 
          src={deal.roomPhotoUrl} 
          alt={deal.hotelName} 
          className={styles.image} 
        />
        <div className={styles.discountBadge}>
          {deal.discount}% OFF
        </div>
      </div>

      {/* Card Content */}
      <div className={styles.cardContent}>
        {/* Location & Stars */}
        <div className={styles.meta}>
          <span className={styles.location}>{deal.cityName}</span>
          <div className={styles.stars}>
            {Array.from({ length: deal.hotelStarRating }).map((_, i) => (
              <MdStar key={i} className={styles.starIcon} />
            ))}
          </div>
        </div>

        {/* Hotel Name */}
        <h3 className={styles.hotelName}>{deal.hotelName}</h3>

        {/* Title */}
        <p className={styles.dealTitle}>{deal.title}</p>

        {/* Price Section */}
        <div className={styles.priceSection}>
          <div className={styles.priceInfo}>
            <span className={styles.originalPrice}>
              ${deal.originalRoomPrice.toFixed(0)}
            </span>
            <div className={styles.finalPriceWrapper}>
              <span className={styles.finalPrice}>
                ${deal.finalPrice.toFixed(0)}
              </span>
              <span className={styles.perNight}>per night</span>
            </div>
          </div>
          <button className={styles.bookButton}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
