import type { Meta, StoryObj } from '@storybook/react';
import HotelDescription from './HotelDescription';

const meta: Meta<typeof HotelDescription> = {
  title: 'HotelPage/HotelDetails/HotelDescription',
  component: HotelDescription,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HotelDescription>;

export const Default: Story = {
  args: {
    description:
      'Welcome to our luxurious hotel located in the heart of the city. Experience world-class service, elegant rooms, and exceptional dining. Our hotel features modern amenities and is conveniently located near major attractions.',
  },
};

export const LongDescription: Story = {
  args: {
    description:
      'Nestled in the vibrant heart of the city, our hotel offers an unparalleled blend of luxury, comfort, and convenience. Each of our elegantly appointed rooms and suites features contemporary design, plush bedding, and state-of-the-art technology to ensure your stay is nothing short of exceptional. Our award-winning restaurant serves exquisite cuisine crafted by renowned chefs using locally sourced ingredients. Guests can unwind at our rooftop pool with panoramic city views, rejuvenate at our full-service spa, or maintain their fitness routine in our cutting-edge gym. With dedicated concierge service available 24/7, we are committed to making your stay memorable.',
  },
};

export const ShortDescription: Story = {
  args: {
    description: 'Modern hotel with excellent amenities in prime location.',
  },
};
