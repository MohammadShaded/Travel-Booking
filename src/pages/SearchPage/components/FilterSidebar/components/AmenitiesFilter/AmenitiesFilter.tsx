import React from 'react';
import Checkbox from '@/components/common/Checkbox';
import styles from './AmenitiesFilter.module.css';

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

// Common amenities list (API endpoint is currently unavailable)
const COMMON_AMENITIES = [
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
  const handleAmenityChange = (amenityName: string) => (checked: boolean) => {
    if (checked) {
      onChange([...selectedAmenities, amenityName]);
    } else {
      onChange(selectedAmenities.filter((a) => a !== amenityName));
    }
  };

  return (
    <div className={styles.amenitiesFilter}>
      <h4 className={styles.title}>Amenities</h4>
      <div className={styles.options}>
        {COMMON_AMENITIES.map((amenity) => (
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
