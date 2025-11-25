import React from 'react';
import StarRating from '@/components/common/StarRating';
import type { Review } from '@/types';
import styles from './ReviewCard.module.css';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
        <div className={styles.customerInfo}>
          <div className={styles.avatar}>
            {review.customerName.charAt(0).toUpperCase()}
          </div>
          <span className={styles.customerName}>{review.customerName}</span>
        </div>
        <div className={styles.ratingContainer}>
          <StarRating rating={review.rating} size="small" />
          <span className={styles.ratingValue}>{review.rating.toFixed(1)}</span>
        </div>
      </div>
      <p className={styles.description}>{review.description}</p>
    </div>
  );
};

export default ReviewCard;
