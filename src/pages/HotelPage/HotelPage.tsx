import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getHotelDetails, getHotelGallery, getAvailableRooms } from '@/api/hotelService';
import VisualGallery from './components/VisualGallery';
import HotelDetails from './components/HotelDetails';
import styles from './HotelPage.module.css';
import HotelMap from './components/HotelDetails/components/HotelMap';

const HotelPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [searchParams] = useSearchParams();

  // Fetch hotel data using React Query
  const {
    data: hotel,
    isLoading: isLoadingHotel,
    error: errorHotel,
  } = useQuery({
    queryKey: ['hotel', hotelId],
    queryFn: () => getHotelDetails(hotelId!),
    enabled: !!hotelId,
  });

  const {
    data: gallery,
    isLoading: isLoadingGallery,
    error: errorGallery,
  } = useQuery({
    queryKey: ['hotelGallery', hotelId],
    queryFn: () => getHotelGallery(hotelId!),
    enabled: !!hotelId,
  });

  // Get check-in/out dates from URL params (from SearchPage navigation)
  // Format: /hotel/1?checkIn=2025-12-01&checkOut=2025-12-05
  const checkInDate = searchParams.get('checkIn') || new Date().toISOString().split('T')[0];
  const checkOutDate = searchParams.get('checkOut') || new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const {
    data: rooms,
    isLoading: isLoadingRooms,
    error: errorRooms,
  } = useQuery({
    queryKey: ['availableRooms', hotelId, checkInDate, checkOutDate],
    queryFn: () => getAvailableRooms(hotelId!, checkInDate, checkOutDate),
    enabled: !!hotelId && !!checkInDate && !!checkOutDate,
  });

  const handleBookRoom = (roomId: number) => {
    // TODO: Implement booking logic
    console.log('Booking room:', roomId);
    // Navigate to booking page or show booking modal
  };

  if (isLoadingHotel || isLoadingGallery || isLoadingRooms) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading hotel information...</p>
      </div>
    );
  }

  if (errorHotel || errorGallery || errorRooms) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error loading hotel data</h2>
        <p>Please try refreshing the page or contact support.</p>
      </div>
    );
  }

  if (!hotel || !gallery) {
    return (
      <div className={styles.notFoundContainer}>
        <h2>Hotel not found</h2>
        <p>The hotel you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className={styles.hotelPage}>
      <div className={styles.mainContent}>
        <div className={styles.hotelInfo}>
          <HotelDetails hotel={hotel} rooms={rooms || []} onBookRoom={handleBookRoom} />
          <div>
            <VisualGallery images={gallery} hotelName={hotel.hotelName} />
            <HotelMap
              latitude={hotel.latitude}
              longitude={hotel.longitude}
              hotelName={hotel.hotelName}
              location={hotel.location}
            />
          </div>
        </div>

        <div className={styles.detailsColumn}></div>
      </div>
    </div>
  );
};

export default HotelPage;
