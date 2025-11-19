import type { Meta, StoryObj } from '@storybook/react';
import HotelHeader from './HotelHeader';

const meta: Meta<typeof HotelHeader> = {
  title: 'HotelPage/HotelDetails/HotelHeader',
  component: HotelHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HotelHeader>;

export const FiveStarAvailable: Story = {
  args: {
    name: 'Grand Plaza Hotel',
    location: 'New York, USA',
    starRating: 5,
    availableRooms: 12,
  },
};

export const ThreeStarAvailable: Story = {
  args: {
    name: 'Comfort Inn',
    location: 'Los Angeles, CA',
    starRating: 3,
    availableRooms: 5,
  },
};

export const SoldOut: Story = {
  args: {
    name: 'Beachfront Resort',
    location: 'Miami, FL',
    starRating: 4,
    availableRooms: 0,
  },
};

export const LongName: Story = {
  args: {
    name: 'The Royal International Grand Hotel & Spa Resort',
    location: 'Paris, France',
    starRating: 5,
    availableRooms: 8,
  },
};

export const NoStarRating: Story = {
  args: {
    name: 'Budget Inn',
    location: 'Austin, TX',
    starRating: 0,
    availableRooms: 15,
  },
};
