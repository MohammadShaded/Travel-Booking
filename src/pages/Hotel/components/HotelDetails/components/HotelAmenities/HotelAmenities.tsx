import React from 'react';
import {
  FaWifi,
  FaDumbbell,
  FaSwimmingPool,
  FaCar,
  FaConciergeBell,
  FaUtensils,
  FaSpa,
  FaWineGlass,
  FaCoffee,
  FaShieldAlt,
} from 'react-icons/fa';
import styles from './HotelAmenities.module.css';
import type { Amenity } from '@/types';

interface HotelAmenitiesProps {
  amenities: Amenity[];
}

const getAmenityIcon = (amenityName: string) => {
  const name = amenityName.toLowerCase();
  if (name.includes('wi-fi') || name.includes('internet')) return <FaWifi />;
  if (name.includes('fitness') || name.includes('gym')) return <FaDumbbell />;
  if (name.includes('pool') || name.includes('swimming')) return <FaSwimmingPool />;
  if (name.includes('parking') || name.includes('car')) return <FaCar />;
  if (name.includes('concierge') || name.includes('service')) return <FaConciergeBell />;
  if (name.includes('restaurant') || name.includes('dining')) return <FaUtensils />;
  if (name.includes('spa') || name.includes('wellness')) return <FaSpa />;
  if (name.includes('bar') || name.includes('lounge')) return <FaWineGlass />;
  if (name.includes('coffee') || name.includes('breakfast')) return <FaCoffee />;
  if (name.includes('security') || name.includes('safe')) return <FaShieldAlt />;
  return <FaConciergeBell />; // default icon
};

const HotelAmenities: React.FC<HotelAmenitiesProps> = ({ amenities }) => {
  return (
    <div className={styles.amenitiesContainer}>
      <h2 className={styles.sectionTitle}>Hotel Amenities</h2>
      <div className={styles.amenitiesGrid}>
        {amenities.map((amenity, index) => (
          <div key={index} className={styles.amenityCard}>
            <div className={styles.amenityIcon}>{getAmenityIcon(amenity.name)}</div>
            <div className={styles.amenityContent}>
              <h3 className={styles.amenityName}>{amenity.name}</h3>
              <p className={styles.amenityDescription}>{amenity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelAmenities;
