import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import HotelCard from './HotelCard';

const meta: Meta<typeof HotelCard> = {
  title: 'SearchPage/HotelCard',
  component: HotelCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ maxWidth: '900px', padding: '1rem' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HotelCard>;

export const Default: Story = {
  args: {
    hotelId: 1,
    hotelName: 'Grand Plaza Hotel',
    location: 'Paris, France',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    starRating: 4.5,
    price: 250,
    roomType: 'Deluxe Suite',
    description: 'Luxurious hotel in the heart of Paris with stunning city views and world-class amenities.',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant'],
  },
};

export const WithDiscount: Story = {
  args: {
    hotelId: 2,
    hotelName: 'Seaside Resort',
    location: 'Miami, USA',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
    starRating: 5,
    price: 400,
    discount: 25,
    roomType: 'Ocean View Room',
    description: 'Beachfront resort with private beach access and premium facilities.',
    amenities: ['Beach Access', 'Free WiFi', 'Pool', 'Gym', 'Bar'],
  },
};

export const BudgetHotel: Story = {
  args: {
    hotelId: 3,
    hotelName: 'City Center Inn',
    location: 'London, UK',
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
    starRating: 3,
    price: 85,
    roomType: 'Standard Room',
    description: 'Affordable accommodation in central London, perfect for budget travelers.',
    amenities: ['Free WiFi', 'Breakfast'],
  },
};

export const LuxuryHotel: Story = {
  args: {
    hotelId: 4,
    hotelName: 'The Royal Palace',
    location: 'Dubai, UAE',
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400',
    starRating: 5,
    price: 850,
    discount: 15,
    roomType: 'Presidential Suite',
    description: 'Experience ultimate luxury in our presidential suite with panoramic city views.',
    amenities: ['Concierge', 'Spa', 'Pool', 'Restaurant', 'Bar', 'Gym', 'Room Service', 'Valet'],
  },
};

export const NoDescription: Story = {
  args: {
    hotelId: 5,
    hotelName: 'Mountain Lodge',
    location: 'Swiss Alps',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400',
    starRating: 4,
    price: 320,
    roomType: 'Mountain View Room',
    amenities: ['Ski Storage', 'Fireplace', 'Free WiFi'],
  },
};

export const MinimalAmenities: Story = {
  args: {
    hotelId: 6,
    hotelName: 'Basic Hostel',
    location: 'Barcelona, Spain',
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400',
    starRating: 2.5,
    price: 45,
    roomType: 'Shared Dorm',
    description: 'Budget-friendly hostel for backpackers and solo travelers.',
  },
};
