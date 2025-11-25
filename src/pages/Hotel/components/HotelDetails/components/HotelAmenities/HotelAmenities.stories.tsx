import type { Meta, StoryObj } from '@storybook/react';
import HotelAmenities from './HotelAmenities';

const meta: Meta<typeof HotelAmenities> = {
  title: 'HotelPage/HotelDetails/HotelAmenities',
  component: HotelAmenities,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HotelAmenities>;

export const Default: Story = {
  args: {
    amenities: [
      { name: 'Wi-Fi', description: 'Free high-speed internet' },
      { name: 'Swimming Pool', description: 'Outdoor pool with city views' },
      { name: 'Gym', description: '24/7 fitness center' },
      { name: 'Parking', description: 'Free parking available' },
    ],
  },
};

export const ExtensiveAmenities: Story = {
  args: {
    amenities: [
      { name: 'Wi-Fi', description: 'Free high-speed internet' },
      { name: 'Swimming Pool', description: 'Outdoor pool with city views' },
      { name: 'Gym', description: '24/7 fitness center' },
      { name: 'Parking', description: 'Free valet parking' },
      { name: 'Restaurant', description: 'Fine dining restaurant' },
      { name: 'Spa', description: 'Full-service spa and wellness center' },
      { name: 'Bar', description: 'Rooftop cocktail bar' },
      { name: 'Room Service', description: '24-hour room service' },
    ],
  },
};

export const MinimalAmenities: Story = {
  args: {
    amenities: [
      { name: 'Wi-Fi', description: 'Free internet access' },
      { name: 'Parking', description: 'On-site parking' },
    ],
  },
};

export const NoAmenities: Story = {
  args: {
    amenities: [],
  },
};
