import React from 'react';
import PriceRangeFilter from './components/PriceRangeFilter';
import StarRatingFilter from './components/StarRatingFilter';
import AmenitiesFilter from './components/AmenitiesFilter';
import RoomTypeFilter from './components/RoomTypeFilter';
import Button from '@/components/common/Button';
import type { FilterState } from '@/types';
import styles from './FilterSidebar.module.css';

export interface FilterSidebarProps {
  /**
   * Current filter state
   */
  filters: FilterState;
  /**
   * Filter change handler
   */
  onFilterChange: (filters: FilterState) => void;
  /**
   * Reset filters handler
   */
  onReset: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange, onReset }) => {
  const handlePriceChange = (minPrice: number, maxPrice: number) => {
    onFilterChange({ ...filters, minPrice, maxPrice });
  };

  const handleStarRatingChange = (starRatings: number[]) => {
    onFilterChange({ ...filters, starRatings });
  };

  const handleAmenitiesChange = (amenities: string[]) => {
    onFilterChange({ ...filters, amenities });
  };

  const handleRoomTypeChange = (roomTypes: string[]) => {
    onFilterChange({ ...filters, roomTypes });
  };

  const hasActiveFilters =
    filters.minPrice > 0 ||
    filters.maxPrice < 1000 ||
    filters.starRatings.length > 0 ||
    filters.amenities.length > 0 ||
    filters.roomTypes.length > 0;

  return (
    <aside className={styles.filterSidebar}>
      <div className={styles.header}>
        <h3 className={styles.title}>Filters</h3>
        {hasActiveFilters && (
          <Button variant="secondary" size="small" onClick={onReset}>
            Reset All
          </Button>
        )}
      </div>

      <div className={styles.filters}>
        <PriceRangeFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onChange={handlePriceChange}
        />

        <StarRatingFilter selectedRatings={filters.starRatings} onChange={handleStarRatingChange} />

        <AmenitiesFilter selectedAmenities={filters.amenities} onChange={handleAmenitiesChange} />

        <RoomTypeFilter selectedTypes={filters.roomTypes} onChange={handleRoomTypeChange} />
      </div>
    </aside>
  );
};

export default FilterSidebar;
