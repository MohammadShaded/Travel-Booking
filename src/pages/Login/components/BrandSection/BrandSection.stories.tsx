import type { Meta, StoryObj } from '@storybook/react';
import BrandSection from './BrandSection';


const meta = {
  title: 'Pages/LoginPage/BrandSection',
  component: BrandSection,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark-gradient',
      values: [
        {
          name: 'dark-gradient',
          value: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        },
      ],
    },
    docs: {
      description: {
        component: 'Brand section component for authentication pages with animated logo, tagline, and feature highlights.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BrandSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default brand section with all animated elements.
 * Shows the complete branding experience with logo, tagline, description, and feature list.
 */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complete brand section with all elements and animations enabled.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center', minHeight: '600px' }}>
        <Story />
      </div>
    ),
  ],
};
