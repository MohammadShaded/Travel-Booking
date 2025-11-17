import api from './axiosClient';
import type { SearchParams, SearchResult, Amenity } from '@/types';

/**
 * Search for hotels based on criteria
 * GET /home/search
 */
export const searchHotels = async (params: SearchParams): Promise<SearchResult[]> => {
    const queryParams = new URLSearchParams();

    // Add only provided parameters
    if (params.checkInDate) queryParams.append('checkInDate', params.checkInDate);
    if (params.checkOutDate) queryParams.append('checkOutDate', params.checkOutDate);
    if (params.city) queryParams.append('city', params.city);
    if (params.adults !== undefined) queryParams.append('adults', params.adults.toString());
    if (params.children !== undefined) queryParams.append('children', params.children.toString());
    if (params.numberOfRooms !== undefined) queryParams.append('numberOfRooms', params.numberOfRooms.toString());
    if (params.starRate !== undefined) queryParams.append('starRate', params.starRate.toString());
    if (params.sort) queryParams.append('sort', params.sort);

    const url = queryParams.toString() ? `/home/search?${queryParams.toString()}` : '/home/search';
    const response = await api.get<SearchResult[]>(url);
    return response.data;
};

// note:this endpoint currently returns 500 error, using hardcoded list in components
export const getAmenities = async (): Promise<Amenity[]> => {
    const response = await api.get<Amenity[]>('/hotel-Amenities?pageSize=100&pageNumber=1');
    return response.data;
};
