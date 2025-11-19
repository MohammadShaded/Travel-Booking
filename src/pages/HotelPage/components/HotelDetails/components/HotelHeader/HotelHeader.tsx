import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import StarRating from '@/components/common/StarRating';
import styles from './HotelHeader.module.css';

interface HotelHeaderProps {
  name: string;
  location: string;
  starRating: number;
  availableRooms: number;
}

const HotelHeader: React.FC<HotelHeaderProps> = ({
  name,
  location,
  starRating,
  availableRooms,
}) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.hotelInfo}>
        <h1 className={styles.hotelName}>{name}</h1>
        <div className={styles.ratingLocation}>
          <StarRating rating={starRating} size="medium" />
          <div className={styles.location}>
            <FaMapMarkerAlt className={styles.locationIcon} />
            <span className={styles.locationText}>{location}</span>
          </div>
        </div>
      </div>
      <div className={styles.availability}>
        <span className={styles.availabilityText}>
          {availableRooms} rooms available
        </span>
      </div>
    </div>
  );
};

export default HotelHeader;