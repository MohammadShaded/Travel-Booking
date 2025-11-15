// Authentication related types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  authentication: string;
  userType: 'User' | 'Admin';
  userId?: number; // Optional for now, may be returned by API
}

export interface User {
  id: number;
  username: string;
  name: string;
  role: 'User' | 'Admin';
}

// City related types (Based on API: GET /cities)
export interface City {
  id: number;
  name: string;
  country: string;
  description?: string;
  thumbnailUrl?: string;
}

// Hotel related types (Based on API: GET /hotels/{hotelId})
export interface Hotel {
  id: number;
  name: string;
  location: string;
  description: string;
  starRating: number;
  amenities: string[];
  imageUrl: string;
  numberOfAvailableRooms: number;
  cityId?: number;
}

// Amenity types (Based on API: GET /Amenities)
export interface Amenity {
  name: string;
  description: string;
}

// Room types (Based on API: GET /hotels/{hotelId}/rooms)
export interface Room {
  id: number;
  roomNumber: string;
  roomImageUrl: string;
  roomType: string;
  capacityAdults: number;
  capacityChildren: number;
  roomAmenities: string[];
  price: number;
  availability: boolean;
  hotelId?: number;
}

// Room Type (Based on API: GET /room-types)
export interface RoomType {
  id: number;
  name: string;
}

// Booking types (Based on API: POST /booking, GET /booking/{bookingId})
export interface Booking {
  id: number;
  userId: number;
  hotelId: number;
  roomId: number;
  checkInDate: string; // Format: YYYY-MM-DD
  checkOutDate: string; // Format: YYYY-MM-DD
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface BookingRequest {
  userId: number;
  hotelId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  paymentMethod: string;
  customerName: string;
  customerEmail: string;
}

// Search related types (Based on API: GET /search)
export interface SearchParams {
  checkInDate: string; // Format: YYYY-MM-DD
  checkOutDate: string; // Format: YYYY-MM-DD
  adults: number;
  children: number;
  rooms: number;
  amenities?: string[];
  starRate?: number;
}

export interface SearchResult {
  hotelName: string;
  hotelLocation: string;
  price: number;
  roomType: string;
  city: string;
  roomPicture: string;
  discount?: number;
  amenities: string[];
  starRating: number;
}

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
export type HotelGallery = string[]; // List of Image URLs

// Admin Related Types
export interface AdminSearchParams {
  [key: string]: string | number | undefined;
}

export interface CityRequest {
  name: string;
  country: string;
  description?: string;
}

export interface HotelRequest {
  name: string;
  cityId: number;
  location: string;
  description: string;
  starRating: number;
  amenities: string[];
  imageUrl: string;
}

export interface RoomRequest {
  roomNumber: string;
  hotelId: number;
  roomType: string;
  capacityAdults: number;
  capacityChildren: number;
  roomAmenities: string[];
  price: number;
  availability: boolean;
}
