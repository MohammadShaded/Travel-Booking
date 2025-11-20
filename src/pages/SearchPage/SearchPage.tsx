import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSidebar from './components/FilterSidebar';
import HotelList from './components/HotelList';
import SortDropdown from './components/SortDropdown';
import SearchBar from '@/pages/Home/components/SearchBar';
import { searchHotels } from '@/api/searchService';
import type { SearchResult, SearchParams, FilterState, SortOption } from '@/types';
import styles from './SearchPage.module.css';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState<SearchResult[]>([]);
  const [allHotels, setAllHotels] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');

  // Initialize filters from URL params
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 1000,
    starRatings: [],
    amenities: [],
    roomTypes: [],
  });

  // Fetch hotels on mount
  useEffect(() => {
    const fetchHotels = async () => {
      setIsLoading(true);
      try {
        const city = searchParams.get('city');
        const checkInDate = searchParams.get('checkInDate');
        const checkOutDate = searchParams.get('checkOutDate');
        const adults = searchParams.get('adults');
        const children = searchParams.get('children');
        const numberOfRooms = searchParams.get('numberOfRooms');

        // Build params object only with provided values
        const params: SearchParams = {};

        if (city) params.city = city;
        if (checkInDate) params.checkInDate = checkInDate;
        if (checkOutDate) params.checkOutDate = checkOutDate;
        if (adults) params.adults = Number(adults);
        if (children) params.children = Number(children);
        if (numberOfRooms) params.numberOfRooms = Number(numberOfRooms);

        const results = await searchHotels(params);

        setAllHotels(results);
        setHotels(results);
      } catch  {
        setAllHotels([]);
        setHotels([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, [searchParams]);

  // Apply filters and sort locally
  useEffect(() => {
    let filtered = [...allHotels];

    // Apply price filter
    if (filters.minPrice > 0 || filters.maxPrice < 1000) {
      filtered = filtered.filter(
        (hotel) => hotel.roomPrice >= filters.minPrice && hotel.roomPrice <= filters.maxPrice,
      );
    }

    // Apply star rating filter
    if (filters.starRatings.length > 0) {
      filtered = filtered.filter((hotel) =>
        filters.starRatings.includes(Math.floor(hotel.starRating)),
      );
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter((hotel) =>
        filters.amenities.some((amenity) =>
          hotel.amenities.some((hotelAmenity) =>
            hotelAmenity.name.toLowerCase().includes(amenity.toLowerCase()),
          ),
        ),
      );
    }

    // Apply room type filter
    if (filters.roomTypes.length > 0) {
      filtered = filtered.filter((hotel) =>
        filters.roomTypes.some((type) => hotel.roomType.toLowerCase().includes(type.toLowerCase())),
      );
    }

    setHotels(sortResults(filtered, sortBy));
  }, [filters, sortBy, allHotels]);

  const sortResults = (results: SearchResult[], sortOption: SortOption): SearchResult[] => {
    const sorted = [...results];

    switch (sortOption) {
      case 'price-asc':
        return sorted.sort((a, b) => a.roomPrice - b.roomPrice);
      case 'price-desc':
        return sorted.sort((a, b) => b.roomPrice - a.roomPrice);
      case 'rating-desc':
        return sorted.sort((a, b) => b.starRating - a.starRating);
      case 'rating-asc':
        return sorted.sort((a, b) => a.starRating - b.starRating);
      default:
        return sorted;
    }
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 1000,
      starRatings: [],
      amenities: [],
      roomTypes: [],
    });
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
  };

  const searchInfo = {
    city: searchParams.get('city') || '',
    checkInDate: searchParams.get('checkInDate'),
    checkOutDate: searchParams.get('checkOutDate'),
    adults: searchParams.get('adults') ? Number(searchParams.get('adults')) : null,
    children: searchParams.get('children') ? Number(searchParams.get('children')) : null,
    numberOfRooms: searchParams.get('numberOfRooms')
      ? Number(searchParams.get('numberOfRooms'))
      : null,
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.content}>
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        <main className={styles.mainContent}>
          <div className={styles.searchHeader}>
            <div className={styles.searchBarContainer}>
              <SearchBar
                initialCity={searchInfo.city}
                initialCheckIn={searchInfo.checkInDate || undefined}
                initialCheckOut={searchInfo.checkOutDate || undefined}
                initialAdults={searchInfo.adults || undefined}
                initialChildren={searchInfo.children || undefined}
                initialRooms={searchInfo.numberOfRooms || undefined}
              />
            </div>

            <div className={styles.searchInfo}>
              <SortDropdown value={sortBy} onChange={handleSortChange} />
            </div>
          </div>
          <HotelList
            hotels={hotels}
            isLoading={isLoading}
            hasMore={false}
            onLoadMore={() => {}}
            checkInDate={searchInfo.checkInDate}
            checkOutDate={searchInfo.checkOutDate}
          />
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
