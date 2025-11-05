import type { Meta, StoryObj } from '@storybook/react';
import FeatureList from './FeatureList';

/**
 * FeatureList displays three key platform features with animated checkmark icons.
 * 
 * **Features Shown:**
 * - Best Price Guarantee
 * - 24/7 Customer Support
 * - Secure Payments
 * 
 * **Design Elements:**
 * - Glassmorphism effect with backdrop blur
 * - Cyan accent color for icons
 * - Smooth hover animations with scale and glow effects
 * - Staggered fade-in animations
 * - Icon drop shadows and hover transforms
 * 
 * **Usage:**
 * Nested within BrandSection component on authentication pages.
 * Can be reused independently if needed for other marketing sections.
 * 
 * **Interactions:**
 * - Hover: Card slides right, background brightens, icon scales and glows
 * - Icons have cyan glow effect that intensifies on hover
 */
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

/**
 * Interactive demonstration - hover over features to see animations.
 * Shows scale transforms, glow effects, and smooth transitions.
 */
export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Hover over each feature card to see the scale, glow, and slide animations. Icons rotate and scale with cyan glow effect.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ 
          marginBottom: '2rem', 
          color: 'white', 
          textAlign: 'center',
          fontSize: '1.1rem',
          fontWeight: '500',
        }}>
          <p>✨ Hover over the features to see the animations!</p>
        </div>
        <Story />
      </div>
    ),
  ],
};

/**
 * Feature list in a wider container to show full responsiveness.
 * Cards expand to fill available space while maintaining proper spacing.
 */
export const Wide: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Feature list in a wider container showing how cards scale with available space.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Feature list in a narrower container for compact layouts.
 * Shows how the component adapts to smaller spaces while maintaining readability.
 */
export const Narrow: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Compact view with reduced width, maintaining all functionality and visual effects.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '350px', margin: '0 auto', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Mobile view of the feature list.
 * Shows stacked layout optimized for small screens.
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile viewport showing responsive behavior on small screens.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Tablet view of the feature list.
 * Demonstrates medium screen responsive behavior.
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet viewport view showing how features adapt to medium-sized screens.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Dark mode focus - emphasizes the glassmorphism effect.
 * Shows how the backdrop blur and transparency create depth.
 */
export const GlassmorphismEffect: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Highlights the glassmorphism design with backdrop blur and semi-transparent backgrounds.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        maxWidth: '500px', 
        margin: '0 auto', 
        padding: '3rem',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }} />
        <Story />
      </div>
    ),
  ],
};
