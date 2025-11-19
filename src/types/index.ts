// Authentication related types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  authentication: string;
  userType: 'User' | 'Admin';
  userId?: number; // Optional for now, may be returned by API
}

// Hotel related types (Based on API: GET /hotels/{hotelId})
export interface Hotel {
  hotelName: string;
  location: string;
  description: string;
  latitude: number;
  longitude: number;
  amenities: Array<{
    name: string;
    description: string;
  }>;
  starRating: number;
  availableRooms: number;
  imageUrl: string;
  cityId: number;
}

// Amenity types (Based on API: GET /Amenities)
export interface Amenity {
  name: string;
  description: string;
}

// Room types (Based on API: GET /hotels/{hotelId}/rooms)
export interface Room {
  roomId: number;
  roomNumber: number;
  roomPhotoUrl: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  roomAmenities: Array<{
    name: string;
    description: string;
  }>;
  price: number;
  availability: boolean;
}

export interface BookingRequest {
  customerName: string;
  hotelName: string;
  roomNumber: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  totalCost: number;
  paymentMethod: string;
}

export interface BookingConfirmation {
  customerName: string;
  hotelName: string;
  roomNumber: string;
  roomType: string;
  bookingDateTime: string;
  totalCost: number;
  paymentMethod: string;
  bookingStatus: string;
  confirmationNumber: string;
}

export interface CheckoutLocationState {
  hotelName: string;
  roomType: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  totalCost: number;
}

export interface CheckoutFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: string;
  specialRequests?: string;
}

// Search related types (Based on API: GET /home/search)
export interface SearchParams {
  checkInDate?: string; // Format: YYYY-MM-DD
  checkOutDate?: string; // Format: YYYY-MM-DD
  city?: string;
  adults?: number;
  children?: number;
  numberOfRooms?: number;
  starRate?: number;
  sort?: string;
}

export interface SearchResult {
  hotelId: number;
  hotelName: string;
  starRating: number;
  latitude: number;
  longitude: number;
  roomPrice: number;
  roomType: string;
  cityName: string;
  roomPhotoUrl: string;
  discount: number;
  amenities: Array<{
    id: number;
    name: string;
    description: string;
  }>;
}

// Filter state for Search page
export interface FilterState {
  minPrice: number;
  maxPrice: number;
  starRatings: number[];
  amenities: string[];
  roomTypes: string[];
}

// Sort options for search results
export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'rating-asc';

// Featured Deals (Based on API: GET /home/featured-deals)
export interface FeaturedDeal {
  hotelId: number;
  originalRoomPrice: number;
  discount: number;
  finalPrice: number;
  cityName: string;
  hotelName: string;
  hotelStarRating: number;
  title: string;
  description: string;
  roomPhotoUrl: string;
}

// Recently Visited Hotels (Based on API: GET /users/{userId}/recent-hotels)
export interface RecentHotel {
  hotelId: number;
  hotelName: string;
  starRating: number;
  visitDate: string; // Format: YYYY-MM-DDTHH:mm:ss
  cityName: string;
  thumbnailUrl: string;
  priceLowerBound: number;
  priceUpperBound: number;
}

// Trending Destinations (Based on API: GET /home/destinations/trending)
export interface TrendingDestination {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
}

// Hotel Gallery (Based on API: GET /hotels/{hotelId}/gallery)
export interface HotelGalleryImage {
  id: number;
  url: string;
}
export type HotelGallery = HotelGalleryImage[];
