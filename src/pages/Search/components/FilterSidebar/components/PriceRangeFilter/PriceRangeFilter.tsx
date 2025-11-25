import React, { useState, useEffect } from 'react';
import styles from './PriceRangeFilter.module.css';

export interface PriceRangeFilterProps {
  /**
   * Minimum price value
   */
  minPrice: number;
  /**
   * Maximum price value
   */
  maxPrice: number;
  /**
   * Change handler
   */
  onChange: (minPrice: number, maxPrice: number) => void;
  /**
   * Minimum allowed price
   */
  min?: number;
  /**
   * Maximum allowed price
   */
  max?: number;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice,
  maxPrice,
  onChange,
  min = 0,
  max = 1000,
}) => {
  const [minInput, setMinInput] = useState(minPrice.toString());
  const [maxInput, setMaxInput] = useState(maxPrice.toString());

  // Sync local state with props when they change (e.g., on reset)
  useEffect(() => {
    setMinInput(minPrice.toString());
    setMaxInput(maxPrice.toString());
  }, [minPrice, maxPrice]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinInput(value);
    const numValue = parseInt(value) || 0;
    if (numValue >= min && numValue <= maxPrice) {
      onChange(numValue, maxPrice);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxInput(value);
    const numValue = parseInt(value) || max;
    if (numValue <= max && numValue >= minPrice) {
      onChange(minPrice, numValue);
    }
  };

  return (
    <div className={styles.priceFilter}>
      <h4 className={styles.title}>Price Range</h4>

      <div className={styles.inputContainer}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Min</label>
          <div className={styles.inputWrapper}>
            <span className={styles.currency}>$</span>
            <input
              type="number"
              className={styles.input}
              value={minInput}
              onChange={handleMinChange}
              min={min}
              max={maxPrice}
              placeholder="0"
            />
          </div>
        </div>

        <span className={styles.separator}>-</span>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Max</label>
          <div className={styles.inputWrapper}>
            <span className={styles.currency}>$</span>
            <input
              type="number"
              className={styles.input}
              value={maxInput}
              onChange={handleMaxChange}
              min={minPrice}
              max={max}
              placeholder="1000"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
