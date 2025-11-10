import api from './axiosClient';
import type { RecentHotel } from '@/types';


export const userService = {

    getRecentHotels: async (userId: number): Promise<RecentHotel[]> => {
        const response = await api.get<RecentHotel[]>(`home/users/${userId}/recent-hotels`);
        return response.data;
    },
};
