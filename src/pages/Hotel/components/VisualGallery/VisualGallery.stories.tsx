import type { Meta, StoryObj } from '@storybook/react';
import VisualGallery from './VisualGallery';

const meta: Meta<typeof VisualGallery> = {
  title: 'HotelPage/VisualGallery',
  component: VisualGallery,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VisualGallery>;

const mockImages = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
  'https://images.unsplash.com/photo-1578774204375-8e5c2e3b72e0?w=800',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
];

export const Default: Story = {
  args: {
    images: mockImages,
    hotelName: 'Plaza Hotel',
  },
};

export const WithManyImages: Story = {
  args: {
    images: [
      ...mockImages,
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
    ],
    hotelName: 'Luxury Resort',
  },
};

export const WithFewImages: Story = {
  args: {
    images: mockImages.slice(0, 3),
    hotelName: 'Boutique Hotel',
  },
};
