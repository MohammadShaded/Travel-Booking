import type { Meta, StoryObj } from '@storybook/react';
import StarRating from './StarRating';

const meta: Meta<typeof StarRating> = {
  title: 'Common/StarRating',
  component: StarRating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: 'Rating value (0-5)',
    },
    maxStars: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum number of stars',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant',
    },
    showNumber: {
      control: 'boolean',
      description: 'Show rating number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const Default: Story = {
  args: {
    rating: 4,
    showNumber: false,
  },
};

export const WithNumber: Story = {
  args: {
    rating: 4.5,
    showNumber: true,
  },
};

export const Small: Story = {
  args: {
    rating: 3.5,
    size: 'small',
    showNumber: true,
  },
};

export const Large: Story = {
  args: {
    rating: 5,
    size: 'large',
    showNumber: true,
  },
};

export const PartialRating: Story = {
  args: {
    rating: 2.7,
    showNumber: true,
  },
};

export const FullRating: Story = {
  args: {
    rating: 5,
    showNumber: true,
  },
};

export const LowRating: Story = {
  args: {
    rating: 1.5,
    showNumber: true,
  },
};

export const ZeroRating: Story = {
  args: {
    rating: 0,
    showNumber: true,
  },
};
