import { useState, useRef, useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import styles from './CurrencySelector.module.css';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

export default function CurrencySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Load selected currency from localStorage on mount
  useEffect(() => {
    const savedCurrencyCode = localStorage.getItem('selectedCurrency');
    if (savedCurrencyCode) {
      const currency = currencies.find((c) => c.code === savedCurrencyCode);
      if (currency) {
        setSelectedCurrency(currency);
      }
    }
  }, []);

  const handleCurrencySelect = (currency: typeof currencies[0]) => {
    setSelectedCurrency(currency);
    localStorage.setItem('selectedCurrency', currency.code);
    setIsOpen(false);
  };

  return (
    <div className={styles.currencySelector} ref={dropdownRef}>
      <button
        className={styles.currencyButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.currencyCode}>{selectedCurrency.code}</span>
        <span className={styles.currencySymbol}>{selectedCurrency.symbol}</span>
        <MdKeyboardArrowDown
          className={`${styles.arrowIcon} ${isOpen ? styles.arrowOpen : ''}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {currencies.map((currency) => (
            <button
              key={currency.code}
              className={`${styles.dropdownItem} ${
                currency.code === selectedCurrency.code ? styles.active : ''
              }`}
              onClick={() => handleCurrencySelect(currency)}
            >
              <div className={styles.currencyInfo}>
                <span className={styles.dropdownCode}>{currency.code}</span>
                <span className={styles.dropdownSymbol}>{currency.symbol}</span>
              </div>
              <span className={styles.currencyName}>{currency.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
