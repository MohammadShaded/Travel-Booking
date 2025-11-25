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
  amenities: Amenity[];
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

export interface AmenityWithId extends Amenity {
  id: number;
}

// Room types (Based on API: GET /hotels/{hotelId}/rooms)
export interface Room {
  roomId: number;
  roomNumber: number;
  roomPhotoUrl: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  amenities: Amenity[];
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
  amenities: AmenityWithId[];
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


export type EntityType = 'cities' | 'hotels' | 'rooms';
  
export interface City {
  id: number;
  name: string;
  description: string;
  country: string;
  postOffice: string;
  numberOfHotels: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCityRequest {
  name: string;
  description: string;
  country: string;
  postOffice: string;
}

export interface UpdateCityRequest {
  name: string;
  description: string;
  country: string;
  postOffice: string;
}

// Admin Hotel (Extended version for admin grid)
export interface AdminHotel {
  id: number;
  hotelName: string;
  location: string;
  description: string;
  hotelType: string;
  starRating: number;
  latitude: number;
  longitude: number;
  rooms: Array<{
    id: number;
    name: string;
    type: string;
    price: number;
    available: boolean;
    maxOccupancy: number;
  }>;
  imageUrl: string;
  availableRooms: number;
  cityId: number;
  amenities: AmenityWithId[];
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHotelRequest {
  hotelName: string;
  location: string;
  description: string;
  hotelType: string;
  starRating: number;
  latitude: number;
  longitude: number;
  imageUrl: string;
  availableRooms: number;
  rooms: Array<unknown>;
  owner: string;
}

export interface UpdateHotelRequest {
  hotelName: string;
  location: string;
  description: string;
  starRating: number;
  availableRooms: number;
  owner: string;
}

// Admin Room (same as user-facing Room but amenities have IDs)
export interface AdminRoom extends Omit<Room, 'amenities'> {
  amenities: AmenityWithId[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomRequest {
  roomNumber: number;
  roomPhotoUrl: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  amenities: AmenityWithId[];
  price: number;
  availability: boolean;
}

export interface UpdateRoomRequest {
  roomNumber: number;
  roomType: string;
  price: number;
  availability: boolean;
}

// Room Type
export interface RoomType {
  id: number;
  name: string;
}

// Admin Search Result (Union type for global search across entities)
export type AdminSearchResultItem =
  | (City & { type: 'city' })
  | (AdminHotel & { type: 'hotel' })
  | (AdminRoom & { type: 'room' });

export type AdminSearchResult = AdminSearchResultItem[];


// DataGrid configuration types
export interface ColumnConfig<T> {
  key: keyof T | 'actions';
  label: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

export interface DataGridConfig<T> {
  entityName: string;
  entityNamePlural: string;
  queryKey: string;
  columns: ColumnConfig<T>[];
  fetchFn: (searchQuery?: string) => Promise<T[]>;
  deleteFn: (id: number) => Promise<T[] | void>;
  getItemId: (item: T) => number;
  searchPlaceholder?: string;
}

// Form configuration types
export type FieldType = 'text' | 'number' | 'textarea' | 'select';

export interface FieldConfig<T> {
  name: keyof T;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  rows?: number;
}

export interface FormConfig<T, CreateReq, UpdateReq> {
  entityName: string;
  queryKey: string;
  fields: FieldConfig<T>[];
  validationSchema: unknown; // Yup schema (using unknown to avoid importing yup in types)
  createFn: (data: CreateReq) => Promise<T | T[]>;
  updateFn: (id: number, data: UpdateReq) => Promise<T | T[]>;
  getItemId: (item: T) => number;
  mapToCreateRequest: (formData: Partial<T>) => CreateReq;
  mapToUpdateRequest: (formData: Partial<T>) => UpdateReq;
  mapFromItem: (item: T) => Partial<T>;
}
