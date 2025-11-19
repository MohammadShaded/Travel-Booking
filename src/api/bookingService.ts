import api from './axiosClient';
import type { BookingRequest, BookingConfirmation } from '@/types';


export const createBooking = async (
  bookingData: BookingRequest
): Promise<BookingConfirmation> => {
  const response = await api.post<BookingConfirmation>(
    '/bookings',
    bookingData
  );
  return response.data;
};


export const getBookingById = async (
  bookingId: string
): Promise<BookingConfirmation> => {
  const response = await api.get<BookingConfirmation>(
    `/bookings/${bookingId}`
  );
  return response.data;
};
