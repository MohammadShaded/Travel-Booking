import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from '@/components/common/StarRating';
import Button from '@/components/common/Button';
import styles from './HotelCard.module.css';

export interface HotelCardProps {
  /**
   * Hotel ID for navigation
   */
  hotelId: number;
  /**
   * Hotel name
   */
  hotelName: string;
  /**
   * Hotel location/city
   */
  location: string;
  /**
   * Room picture URL
   */
  imageUrl: string;
  /**
   * Star rating (1-5)
   */
  starRating: number;
  /**
   * Price per night
   */
  price: number;
  /**
   * Room type
   */
  roomType: string;
  /**
   * Brief description
   */
  description?: string;
  /**
   * Discount percentage (0-100)
   */
  discount?: number;
  /**
   * List of amenities
   */
  amenities?: string[];
}

const HotelCard: React.FC<HotelCardProps> = ({
  hotelId,
  hotelName,
  location,
  imageUrl,
  starRating,
  price,
  roomType,
  description,
  discount,
  amenities = [],
}) => {
  const navigate = useNavigate();

  const discountedPrice = discount ? price * (1 - discount / 100) : price;
  const hasDiscount = discount && discount > 0;

  const handleViewDetails = () => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <article className={styles.hotelCard}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={hotelName} className={styles.image} />
        {hasDiscount && (
          <span className={styles.discountBadge}>-{discount}%</span>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.hotelName}>{hotelName}</h3>
            <p className={styles.location}>{location}</p>
          </div>
          <StarRating rating={starRating} size="small" showNumber />
        </div>

        <p className={styles.roomType}>{roomType}</p>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {amenities.length > 0 && (
          <div className={styles.amenities}>
            {amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className={styles.amenity}>
                {amenity}
              </span>
            ))}
            {amenities.length > 3 && (
              <span className={styles.amenity}>+{amenities.length - 3} more</span>
            )}
          </div>
        )}

        <div className={styles.footer}>
          <div className={styles.pricing}>
            {hasDiscount && (
              <span className={styles.originalPrice}>${price.toFixed(2)}</span>
            )}
            <div className={styles.currentPrice}>
              <span className={styles.price}>${discountedPrice.toFixed(2)}</span>
              <span className={styles.perNight}>per night</span>
            </div>
          </div>

          <Button variant="primary" size="medium" onClick={handleViewDetails}>
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
};

export default HotelCard;
