import React from 'react';
import styles from './HotelDescription.module.css';

interface HotelDescriptionProps {
  description: string;
}

const HotelDescription: React.FC<HotelDescriptionProps> = ({ description }) => {
  return (
    <div className={styles.descriptionContainer}>
      <h2 className={styles.sectionTitle}>About this Hotel</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default HotelDescription;