import type { Meta, StoryObj } from '@storybook/react';
import FeatureList from './FeatureList';


const meta = {
  title: 'Pages/LoginPage/FeatureList',
  component: FeatureList,
  parameters: {
    layout: 'padded',
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
        component: 'Feature list component displaying platform benefits with animated checkmark icons and glassmorphism effects.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeatureList>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default feature list showing all three features with staggered animations.
 * Each feature card has a glassmorphism effect and animates on hover.
 */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Standard feature list with all three platform benefits displayed.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};
