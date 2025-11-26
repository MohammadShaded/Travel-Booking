import api from './axiosClient';
import type {
  City,
  CreateCityRequest,
  UpdateCityRequest,
  AdminHotel,
  CreateHotelRequest,
  UpdateHotelRequest,
  AdminRoom,
  CreateRoomRequest,
  UpdateRoomRequest,
  RoomType,
  AdminSearchResult,
} from '@/types';

export const searchEntities = async (
  query: string,
  type?: 'cities' | 'hotels' | 'rooms'
): Promise<AdminSearchResult> => {
  const params: { query: string; type?: string } = { query };
  if (type) params.type = type;

  const response = await api.get<AdminSearchResult>('/search', { params });
  return response.data;
};


export const getCities = async (params?: {
  cityName?: string;
  country?: string;
}): Promise<City[]> => {
  const response = await api.get<City[]>('/cities', { params });
  return response.data;
};


export const createCity = async (city: CreateCityRequest): Promise<City[]> => {
  const response = await api.post<City[]>('/cities', city);
  return response.data;
};

/**
 * Update an existing city
 */
export const updateCity = async (
  id: number,
  city: UpdateCityRequest
): Promise<City[]> => {
  const response = await api.put<City[]>(`/cities/${id}`, city);
  return response.data;
};

/**
 * Delete a city
 */
export const deleteCity = async (id: number): Promise<City[]> => {
  const response = await api.delete<City[]>(`/cities/${id}`);
  return response.data;
};


export const getHotels = async (params?: {
  searchQuery?: string;
  city?: string;
  pageNumber?: number;
  pageSize?: number;
}): Promise<AdminHotel[]> => {
  const response = await api.get<AdminHotel[]>('/hotels', { params });
  return response.data;
};

/**
 * Create a new hotel
 */
export const createHotel = async (hotel: CreateHotelRequest): Promise<AdminHotel[]> => {
  const response = await api.post<AdminHotel[]>('/hotels', hotel);
  return response.data;
};

/**
 * Update an existing hotel
 */
export const updateHotel = async (
  id: number,
  hotel: UpdateHotelRequest
): Promise<AdminHotel[]> => {
  const response = await api.put<AdminHotel[]>(`/hotels/${id}`, hotel);
  return response.data;
};

/**
 * Delete a hotel
 */
export const deleteHotel = async (id: number): Promise<AdminHotel[]> => {
  const response = await api.delete<AdminHotel[]>(`/hotels/${id}`);
  return response.data;
};


export const getRooms = async (params?: {
  roomNumber?: string;
  hotel?: string;
  city?: string;
}): Promise<AdminRoom[]> => {
  const response = await api.get<AdminRoom[]>('/rooms', { params });
  return response.data;
};

/**
 * Get rooms by hotel ID
 */
export const getRoomsByHotelId = async (hotelId: number): Promise<AdminRoom[]> => {
  const response = await api.get<AdminRoom[]>(`/hotels/${hotelId}/rooms`);
  return response.data;
};

/**
 * Get available room types
 */
export const getRoomTypes = async (): Promise<RoomType[]> => {
  const response = await api.get<RoomType[]>('/room-types');
  return response.data;
};

/**
 * Create a new room
 */
export const createRoom = async (room: CreateRoomRequest): Promise<AdminRoom[]> => {
  const response = await api.post<AdminRoom[]>('/rooms', room);
  return response.data;
};

/**
 * Update an existing room
 */
export const updateRoom = async (
  id: number,
  room: UpdateRoomRequest
): Promise<AdminRoom[]> => {
  const response = await api.put<AdminRoom[]>(`/rooms/${id}`, room);
  return response.data;
};

/**
 * Delete a room
 */
export const deleteRoom = async (id: number): Promise<AdminRoom[]> => {
  const response = await api.delete<AdminRoom[]>(`/rooms/${id}`);
  return response.data;
};
