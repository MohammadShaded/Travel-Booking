import type { Meta, StoryObj } from '@storybook/react';
import BookingSummary from './BookingSummary';

const meta: Meta<typeof BookingSummary> = {
  title: 'Pages/Checkout/Components/BookingSummary',
  component: BookingSummary,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof BookingSummary>;

export const StandardBooking: Story = {
  args: {
    bookingData: {
      hotelName: 'Grand Plaza Hotel',
      roomType: 'Deluxe Suite',
      roomNumber: '101',
      checkInDate: '2025-12-01',
      checkOutDate: '2025-12-05',
      totalCost: 1200,
    },
  },
};

export const SingleNight: Story = {
  args: {
    bookingData: {
      hotelName: 'Airport Inn',
      roomType: 'Standard Room',
      roomNumber: '205',
      checkInDate: '2025-12-01',
      checkOutDate: '2025-12-02',
      totalCost: 120,
    },
  },
};

export const LongStay: Story = {
  args: {
    bookingData: {
      hotelName: 'Beachfront Resort & Spa',
      roomType: 'Presidential Suite',
      roomNumber: '2001',
      checkInDate: '2025-12-01',
      checkOutDate: '2025-12-15',
      totalCost: 7000,
    },
  },
};

export const BudgetRoom: Story = {
  args: {
    bookingData: {
      hotelName: 'Budget Inn Downtown',
      roomType: 'Economy Room',
      roomNumber: '105',
      checkInDate: '2025-12-10',
      checkOutDate: '2025-12-12',
      totalCost: 180,
    },
  },
};

export const LuxuryBooking: Story = {
  args: {
    bookingData: {
      hotelName: 'The Ritz-Carlton',
      roomType: 'Royal Penthouse Suite',
      roomNumber: 'PH-01',
      checkInDate: '2025-12-20',
      checkOutDate: '2025-12-27',
      totalCost: 25000,
    },
  },
};
