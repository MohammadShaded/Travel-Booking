import { MdLocationOn, MdArrowForward } from 'react-icons/md';
import type { TrendingDestination } from '@/types';
import styles from './DestinationCard.module.css';

interface DestinationCardProps {
  destination: TrendingDestination;
  onClick: (cityId: number) => void;
}


export default function DestinationCard({ destination, onClick }: DestinationCardProps) {
  return (
    <div
      className={styles.destinationCard}
      onClick={() => onClick(destination.cityId)}
    >
      {/* Image Container */}
      <div className={styles.imageContainer}>
        <img 
          src={destination.thumbnailUrl} 
          alt={destination.cityName} 
          className={styles.image} 
        />
        <div className={styles.overlay} />
      </div>

      {/* Card Content */}
      <div className={styles.content}>
        {/* Location */}
        <div className={styles.location}>
          <MdLocationOn className={styles.locationIcon} />
          <span className={styles.country}>{destination.countryName}</span>
        </div>

        {/* City Name */}
        <h3 className={styles.cityName}>{destination.cityName}</h3>

        {/* Description */}
        <p className={styles.description}>{destination.description}</p>

        {/* Explore Button */}
        <button className={styles.exploreButton}>
          Explore
          <MdArrowForward className={styles.arrowIcon} />
        </button>
      </div>
    </div>
  );
}
