import React from 'react';
import { FaUser, FaChild, FaCheckCircle } from 'react-icons/fa';
import Button from '@/components/common/Button';
import type { Room } from '@/types';
import styles from './RoomCard.module.css';

interface RoomCardProps {
  room: Room;
  onBookRoom: (roomId: number) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onBookRoom }) => {
  const handleBookNow = () => {
    onBookRoom(room.roomId);
  };

  return (
    <div className={styles.roomCard}>
      <div className={styles.roomImage}>
        <img src={room.roomPhotoUrl} alt={room.roomType} />
        {room.availability && (
          <div className={styles.availabilityBadge}>
            <FaCheckCircle />
            Available
          </div>
        )}
      </div>
      
      <div className={styles.roomContent}>
        <div className={styles.roomHeader}>
          <h3 className={styles.roomType}>{room.roomType}</h3>
          <div className={styles.roomNumber}>Room {room.roomNumber}</div>
        </div>
        
        <div className={styles.capacity}>
          <div className={styles.capacityItem}>
            <FaUser className={styles.capacityIcon} />
            <span>{room.capacityOfAdults} Adults</span>
          </div>
          {room.capacityOfChildren > 0 && (
            <div className={styles.capacityItem}>
              <FaChild className={styles.capacityIcon} />
              <span>{room.capacityOfChildren} Children</span>
            </div>
          )}
        </div>

        {room.roomAmenities.length > 0 && (
          <div className={styles.amenities}>
            <h4 className={styles.amenitiesTitle}>Room Amenities</h4>
            <div className={styles.amenitiesList}>
              {room.roomAmenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className={styles.amenityTag}>
                  {amenity.name}
                </span>
              ))}
              {room.roomAmenities.length > 3 && (
                <span className={styles.moreAmenities}>
                  +{room.roomAmenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className={styles.roomFooter}>
          <div className={styles.pricing}>
            <span className={styles.priceLabel}>Per night</span>
            <span className={styles.price}>${room.price}</span>
          </div>
          <Button
            variant="primary"
            onClick={handleBookNow}
            disabled={!room.availability}
            className={styles.bookButton}
          >
            {room.availability ? 'Book Now' : 'Not Available'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;