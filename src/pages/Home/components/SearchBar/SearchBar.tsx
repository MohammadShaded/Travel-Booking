import { useState, useRef, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import type { Range } from 'react-date-range';
import { addDays } from 'date-fns';
import { MdSearch } from 'react-icons/md';
import GuestsSelector from './GuestsSelector';
import styles from './SearchBar.module.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useNavigate } from 'react-router-dom';

interface DateRangeSelection {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface SearchBarProps {
  isCompact?: boolean;
  initialCity?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialAdults?: number;
  initialChildren?: number;
  initialRooms?: number;
}

export default function SearchBar({ 
  isCompact = false,
  initialCity = '',
  initialCheckIn,
  initialCheckOut,
  initialAdults = 2,
  initialChildren = 0,
  initialRooms = 1,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialCity);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestsSelector, setShowGuestsSelector] = useState(false);
  const navigate = useNavigate();
    
  const [dateRange, setDateRange] = useState<DateRangeSelection[]>([
    {
      startDate: initialCheckIn ? new Date(initialCheckIn) : new Date(),
      endDate: initialCheckOut ? new Date(initialCheckOut) : addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  const [guests, setGuests] = useState({
    adults: initialAdults,
    children: initialChildren,
    rooms: initialRooms,
  });

  const datePickerRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(event.target as Node)) {
        setShowGuestsSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    const checkInDate = dateRange[0].startDate.toISOString().split('T')[0];
    const checkOutDate = dateRange[0].endDate.toISOString().split('T')[0];
    
    const searchParams = new URLSearchParams();
    
    // Only add parameters that have values
    if (searchQuery.trim()) searchParams.append('city', searchQuery.trim());
    searchParams.append('checkInDate', checkInDate);
    searchParams.append('checkOutDate', checkOutDate);
    searchParams.append('adults', guests.adults.toString());
    searchParams.append('children', guests.children.toString());
    searchParams.append('numberOfRooms', guests.rooms.toString());
    
    navigate(`/search?${searchParams.toString()}`);
  };

  const handleClickSearch = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Focus on search input after scroll animation completes
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 500);
  };

  const formatCompactGuests = () => {
    const total = guests.adults + guests.children;
    return `${total} guest${total > 1 ? 's' : ''}`;
  };

  // Compact view for scrolled state (Airbnb style)
  if (isCompact) {
    return (
      <div className={`${styles.searchBar} ${styles.searchBarCompact}`} onClick={handleClickSearch}>
        <button className={styles.compactButton}>
          <div className={styles.compactSection}>
            <span className={styles.compactLabel}>Anywhere</span>
          </div>
          <div className={styles.compactDivider}></div>
          <div className={styles.compactSection}>
            <span className={styles.compactLabel}>Any Time</span>
          </div>
          <div className={styles.compactDivider}></div>
          <div className={styles.compactSection}>
            <span className={styles.compactLabel}>{formatCompactGuests()}</span>
          </div>
          <div className={styles.compactSearchIcon}>
            <MdSearch />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className={styles.searchBar}>
      {/* Where */}
      <div className={styles.field}>
        <div className={styles.fieldInner}>
          <label className={styles.fieldLabel}>Where</label>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search destinations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.fieldInput}
          />
        </div>
      </div>

      <div className={styles.divider}></div>

      {/* Check in */}
      <div className={styles.field} ref={datePickerRef}>
        <button className={styles.fieldInner} onClick={() => setShowDatePicker(!showDatePicker)}>
          <label className={styles.fieldLabel}>Check in</label>
          <span className={styles.fieldValue}>
            {dateRange[0].startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </button>

        {showDatePicker && (
          <div className={styles.dropdown}>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                const selection = item.selection as Range;
                if (selection.startDate && selection.endDate) {
                  setDateRange([
                    {
                      startDate: selection.startDate,
                      endDate: selection.endDate,
                      key: 'selection',
                    },
                  ]);
                }
              }}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              minDate={new Date()}
              className={styles.dateRangePicker}
            />
          </div>
        )}
      </div>

      <div className={styles.divider}></div>

      {/* Check out */}
      <div className={styles.field}>
        <button className={styles.fieldInner} onClick={() => setShowDatePicker(!showDatePicker)}>
          <label className={styles.fieldLabel}>Check out</label>
          <span className={styles.fieldValue}>
            {dateRange[0].endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </button>
      </div>

      <div className={styles.divider}></div>

      {/* Guests & Rooms */}
      <div className={styles.field} ref={guestsRef}>
        <button
          className={styles.fieldInner}
          onClick={() => setShowGuestsSelector(!showGuestsSelector)}
        >
          <label className={styles.fieldLabel}>Guests & Rooms</label>
          <span className={styles.fieldValue}>{formatCompactGuests()}</span>
        </button>

        {showGuestsSelector && (
          <div className={styles.dropdown}>
            <GuestsSelector guests={guests} setGuests={setGuests} />
          </div>
        )}
      </div>

      {/* Search Button */}
      <button className={styles.searchButton} onClick={handleSearch}>
        <MdSearch className={styles.searchButtonIcon} />
      </button>
    </div>
  );
}
