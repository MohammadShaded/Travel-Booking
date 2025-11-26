import React from 'react';
import styles from './StarRating.module.css';

export interface StarRatingProps {
  /**
   * Rating value (0-5)
   */
  rating: number;
  /**
   * Maximum number of stars to display
   */
  maxStars?: number;
  /**
   * Size variant of stars
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Show rating number next to stars
   */
  showNumber?: boolean;
  /**
   * Additional CSS class
   */
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 'medium',
  showNumber = false,
  className = '',
}) => {
  const clampedRating = Math.max(0, Math.min(maxStars, rating));
  const fullStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`${styles.starRating} ${styles[size]} ${className}`}>
      <div className={styles.stars} role="img" aria-label={`${rating} out of ${maxStars} stars`}>
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <span key={`full-${index}`} className={`${styles.star} ${styles.full}`}>
            ★
          </span>
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <span className={`${styles.star} ${styles.half}`}>
            <span className={styles.halfFill}>★</span>
            <span className={styles.halfEmpty}>★</span>
          </span>
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <span key={`empty-${index}`} className={`${styles.star} ${styles.empty}`}>
            ★
          </span>
        ))}
      </div>
      
      {showNumber && <span className={styles.ratingNumber}>{rating.toFixed(1)}</span>}
    </div>
  );
};

export default StarRating;
