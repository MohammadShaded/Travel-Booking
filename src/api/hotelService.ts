import api from '@/api/axiosClient';
import type { Hotel, HotelGallery, Room } from '@/types';


export const getHotelDetails = async (hotelId: string): Promise<Hotel> => {
    console.log('Fetching hotel details for ID:', hotelId);
    const response = await api.get<Hotel>(`/hotels/${hotelId}`);
    console.log('Hotel details response:', response.data);
    return response.data;
};


export const getHotelGallery = async (hotelId: string): Promise<string[]> => {
    try {
        const response = await api.get<HotelGallery>(`/hotels/${hotelId}/gallery`);
        // Transform the response to extract just the URLs
        return response.data.map(item => item.url);
    } catch (error) {
        console.warn('Gallery API failed, using mock images:', error);
        // Fallback mock images when API fails
        return [
            'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&w=800&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&w=800&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&w=800&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&w=800&q=80',
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&w=800&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&w=800&q=80',
        ];
    }
};


export const getAvailableRooms = async (
    hotelId: string,
    checkInDate: string,
    checkOutDate: string
): Promise<Room[]> => {
    const response = await api.get<Room[]>(`/hotels/${hotelId}/available-rooms`, {
        params: { checkInDate, checkOutDate },
    });
    return response.data;
};
