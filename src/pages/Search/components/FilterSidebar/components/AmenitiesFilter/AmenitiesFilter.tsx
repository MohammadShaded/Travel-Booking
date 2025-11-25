import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Checkbox from '@/components/common/Checkbox';
import styles from './AmenitiesFilter.module.css';
import { getAmenities } from '@/api/searchService';

export interface AmenitiesFilterProps {
  /**
   * Selected amenities
   */
  selectedAmenities: string[];
  /**
   * Change handler
   */
  onChange: (amenities: string[]) => void;
}

// Fallback amenities list (used if API fails)
const FALLBACK_AMENITIES = [
  'WiFi',
  'Room Service',
  'Private Balcony',
  'Mini Bar',
  'Free Breakfast',
  'Fireplace',
  'City View',
  'Hiking Trails',
  'Spa',
  'Ocean View Balcony',
  'Air Conditioning',
  'Pet Friendly',
];

const AmenitiesFilter: React.FC<AmenitiesFilterProps> = ({ selectedAmenities, onChange }) => {
  // Fetch amenities from API
  const { data: amenitiesData, isLoading, isError } = useQuery({
    queryKey: ['amenities'],
    queryFn: getAmenities,
    staleTime: 1000 * 60 , // Cache for 1 minute
    retry: 1, // Only retry once if API fails
  });

  // Use API data if available, otherwise fallback to hardcoded list
  const amenities = React.useMemo(() => {
    if (amenitiesData && amenitiesData.length > 0) {
      return amenitiesData.map((a) => a.name);
    }
    return FALLBACK_AMENITIES;
  }, [amenitiesData]);
  const handleAmenityChange = (amenityName: string) => (checked: boolean) => {
    if (checked) {
      onChange([...selectedAmenities, amenityName]);
    } else {
      onChange(selectedAmenities.filter((a) => a !== amenityName));
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className={styles.amenitiesFilter}>
        <h4 className={styles.title}>Amenities</h4>
        <div className={styles.options}>
          <p>Loading amenities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.amenitiesFilter}>
      <h4 className={styles.title}>Amenities</h4>
      {isError && (
        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
          Using default amenities list
        </p>
      )}
      <div className={styles.options}>
        {amenities.map((amenity) => (
          <Checkbox
            key={amenity}
            label={amenity}
            checked={selectedAmenities.includes(amenity)}
            onChange={handleAmenityChange(amenity)}
          />
        ))}
      </div>
    </div>
  );
};

export default AmenitiesFilter;
