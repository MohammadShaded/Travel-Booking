import React from 'react';
import Checkbox from '@/components/common/Checkbox';
import styles from './StarRatingFilter.module.css';

export interface StarRatingFilterProps {
  /**
   * Selected star ratings
   */
  selectedRatings: number[];
  /**
   * Change handler
   */
  onChange: (ratings: number[]) => void;
}

const StarRatingFilter: React.FC<StarRatingFilterProps> = ({ selectedRatings, onChange }) => {
  const ratings = [5, 4, 3, 2, 1];

  const handleRatingChange = (rating: number) => (checked: boolean) => {
    if (checked) {
      onChange([...selectedRatings, rating]);
    } else {
      onChange(selectedRatings.filter((r) => r !== rating));
    }
  };

  return (
    <div className={styles.starFilter}>
      <h4 className={styles.title}>Star Rating</h4>
      <div className={styles.options}>
        {ratings.map((rating) => (
          <Checkbox
            key={rating}
            label={`${'★'.repeat(rating)} ${rating} Star${rating > 1 ? 's' : ''}`}
            checked={selectedRatings.includes(rating)}
            onChange={handleRatingChange(rating)}
          />
        ))}
      </div>
    </div>
  );
};

export default StarRatingFilter;
