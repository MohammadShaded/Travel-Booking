import type { Meta, StoryObj } from '@storybook/react';
import RoomCard from './RoomCard';
import type { Room } from '@/types';

const meta: Meta<typeof RoomCard> = {
  title: 'HotelPage/RoomList/RoomCard',
  component: RoomCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RoomCard>;

const baseRoom: Room = {
  roomId: 1,
  roomNumber: 101,
  roomPhotoUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
  roomType: 'Deluxe Suite',
  capacityOfAdults: 2,
  capacityOfChildren: 1,
  roomAmenities: [
    { name: 'Wi-Fi', description: 'Free high-speed internet' },
    { name: 'TV', description: 'Smart TV with streaming' },
    { name: 'Mini Bar', description: 'Complimentary refreshments' },
    { name: 'Balcony', description: 'Private balcony with city view' },
  ],
  price: 299,
  availability: true,
};

export const Available: Story = {
  args: {
    room: baseRoom,
    onBookRoom: (roomId: number) => {
      console.log('Booking room:', roomId);
    },
  },
};

export const Unavailable: Story = {
  args: {
    room: {
      ...baseRoom,
      availability: false,
    },
    onBookRoom: () => {},
  },
};

export const WithManyAmenities: Story = {
  args: {
    room: {
      ...baseRoom,
      roomType: 'Presidential Suite',
      roomAmenities: [
        { name: 'Wi-Fi', description: 'Free internet' },
        { name: 'TV', description: 'Smart TV' },
        { name: 'Mini Bar', description: 'Premium selection' },
        { name: 'Balcony', description: 'Ocean view' },
        { name: 'Jacuzzi', description: 'In-room jacuzzi' },
        { name: 'Room Service', description: '24/7 service' },
      ],
      price: 599,
    },
    onBookRoom: (roomId: number) => {
      console.log('Booking room:', roomId);
    },
  },
};

export const FamilyRoom: Story = {
  args: {
    room: {
      ...baseRoom,
      roomType: 'Family Suite',
      capacityOfAdults: 4,
      capacityOfChildren: 3,
      price: 399,
    },
    onBookRoom: (roomId: number) => {
      console.log('Booking room:', roomId);
    },
  },
};

export const StandardRoom: Story = {
  args: {
    room: {
      ...baseRoom,
      roomType: 'Standard Room',
      capacityOfAdults: 2,
      capacityOfChildren: 0,
      roomAmenities: [
        { name: 'Wi-Fi', description: 'Free internet' },
        { name: 'TV', description: 'Cable TV' },
      ],
      price: 149,
    },
    onBookRoom: (roomId: number) => {
      console.log('Booking room:', roomId);
    },
  },
};

export const BudgetRoom: Story = {
  args: {
    room: {
      ...baseRoom,
      roomType: 'Economy Room',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
      capacityOfAdults: 1,
      capacityOfChildren: 0,
      roomAmenities: [{ name: 'Wi-Fi', description: 'Free internet' }],
      price: 89,
    },
    onBookRoom: (roomId: number) => {
      console.log('Booking room:', roomId);
    },
  },
};
