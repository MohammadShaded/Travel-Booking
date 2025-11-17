import React from 'react';
import Checkbox from '@/components/common/Checkbox';
import styles from './RoomTypeFilter.module.css';

export interface RoomTypeFilterProps {
  /**
   * Selected room types
   */
  selectedTypes: string[];
  /**
   * Change handler
   */
  onChange: (types: string[]) => void;
}

const RoomTypeFilter: React.FC<RoomTypeFilterProps> = ({ selectedTypes, onChange }) => {
  const roomTypes = ['Double', 'Standard', 'King Suite', 'Cabin', 'Ocean View'];

  const handleTypeChange = (type: string) => (checked: boolean) => {
    if (checked) {
      onChange([...selectedTypes, type]);
    } else {
      onChange(selectedTypes.filter((t) => t !== type));
    }
  };

  return (
    <div className={styles.roomTypeFilter}>
      <h4 className={styles.title}>Room Type</h4>
      <div className={styles.options}>
        {roomTypes.map((type) => (
          <Checkbox
            key={type}
            label={type}
            checked={selectedTypes.includes(type)}
            onChange={handleTypeChange(type)}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomTypeFilter;
