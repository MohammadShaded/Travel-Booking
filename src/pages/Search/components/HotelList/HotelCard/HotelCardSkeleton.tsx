import React from 'react';
import styles from './HotelCardSkeleton.module.css';

const HotelCardSkeleton: React.FC = () => {
  return (
    <article className={styles.skeletonCard}>
      <div className={styles.skeletonImage} />
      
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonHeader}>
          <div>
            <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
            <div className={`${styles.skeleton} ${styles.skeletonLocation}`} />
          </div>
          <div className={`${styles.skeleton} ${styles.skeletonRating}`} />
        </div>

        <div className={`${styles.skeleton} ${styles.skeletonRoomType}`} />

        <div className={`${styles.skeleton} ${styles.skeletonDescription}`} />
        <div className={`${styles.skeleton} ${styles.skeletonDescription} ${styles.short}`} />

        <div className={styles.skeletonAmenities}>
          <div className={`${styles.skeleton} ${styles.skeletonAmenity}`} />
          <div className={`${styles.skeleton} ${styles.skeletonAmenity}`} />
          <div className={`${styles.skeleton} ${styles.skeletonAmenity}`} />
        </div>

        <div className={styles.skeletonFooter}>
          <div className={`${styles.skeleton} ${styles.skeletonPrice}`} />
          <div className={`${styles.skeleton} ${styles.skeletonButton}`} />
        </div>
      </div>
    </article>
  );
};

export default HotelCardSkeleton;
