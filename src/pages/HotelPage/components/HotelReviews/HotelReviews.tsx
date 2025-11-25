import React from 'react';
import StarRating from '@/components/common/StarRating';
import type { Review } from '@/types';
import ReviewCard from './ReviewCard';
import styles from './HotelReviews.module.css';

interface HotelReviewsProps {
  reviews: Review[];
  isLoading?: boolean;
}

const HotelReviews: React.FC<HotelReviewsProps> = ({ reviews, isLoading }) => {
  const calculateAverageRating = (): number => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return parseFloat((total / reviews.length).toFixed(1));
  };

  if (isLoading) {
    return (
      <div className={styles.reviewsContainer}>
        <h2 className={styles.title}>Guest Reviews</h2>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className={styles.reviewsContainer}>
        <h2 className={styles.title}>Guest Reviews</h2>
        <div className={styles.noReviews}>
          <p>No reviews yet. Be the first to review this hotel!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Guest Reviews</h2>
        <div className={styles.averageRating}>
          <span className={styles.ratingNumber}>{calculateAverageRating().toFixed(1)}</span>
          <StarRating rating={calculateAverageRating()} size="medium" />
          <span className={styles.reviewCount}>({reviews.length} reviews)</span>
        </div>
      </div>

      <div className={styles.reviewsList}>
        {reviews.map((review) => (
          <ReviewCard key={review.reviewId} review={review} />
        ))}
      </div>
    </div>
  );
};

export default HotelReviews;
