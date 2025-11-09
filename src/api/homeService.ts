import api from './axiosClient';
import type { FeaturedDeal, TrendingDestination } from '@/types';


export const homeService = {

    getFeaturedDeals: async (): Promise<FeaturedDeal[]> => {
        const response = await api.get<FeaturedDeal[]>('/home/featured-deals');
        return response.data;
    },

    getTrendingDestinations: async (): Promise<TrendingDestination[]> => {
        const response = await api.get<TrendingDestination[]>('/home/trending');
        return response.data;
    },
};
