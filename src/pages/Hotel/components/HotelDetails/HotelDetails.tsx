import React from 'react';
import HotelHeader from './components/HotelHeader';
import HotelDescription from './components/HotelDescription';
import HotelAmenities from './components/HotelAmenities';
import type { Hotel, Room } from '@/types';
import styles from './HotelDetails.module.css';
import RoomList from '../RoomList';

interface HotelDetailsProps {
  hotel: Hotel;
  rooms: Room[];
  onBookRoom: (roomId: number) => void;
}

const HotelDetails: React.FC<HotelDetailsProps> = ({ hotel, rooms, onBookRoom }) => {
  return (
    <div className={styles.detailsContainer}>
      <HotelHeader
        name={hotel.hotelName}
        location={hotel.location}
        starRating={hotel.starRating}
        availableRooms={hotel.availableRooms}
      />
      <HotelDescription description={hotel.description} />
      <HotelAmenities amenities={hotel.amenities} />
        <RoomList rooms={rooms || []} onBookRoom={onBookRoom} />
    </div>
  );
};

export default HotelDetails;
