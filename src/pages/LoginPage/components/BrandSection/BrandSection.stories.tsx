import type { Meta, StoryObj } from '@storybook/react';
import BrandSection from './BrandSection';

/**
 * BrandSection displays the TravelEase branding with logo, tagline, description, and feature list.
 * 
 * **Features:**
 * - Animated logo with pulse effect
 * - Gradient text effects on brand name and tagline
 * - Floating orb animations in the background
 * - Three feature cards with hover effects and icons
 * - Fully responsive design
 * 
 * **Usage:**
 * Used on authentication pages (Login, Register, Forgot Password) to provide
 * consistent branding and highlight key platform features.
 * 
 * **Animations:**
 * - Slide-in from left on mount
 * - Staggered fade-in for each element
 * - Pulsing logo animation
 * - Gradient shift on tagline
 * - Floating background orbs
 */
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

/**
 * Brand section in a full-screen container matching the actual login page layout.
 * This view shows how the component appears in production with proper spacing and overflow handling.
 */
export const FullScreen: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Brand section as it appears on the login page with full viewport height and centered layout.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Brand section with floating orbs visible.
 * Extended container to showcase the animated background elements.
 */
export const WithFloatingOrbs: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Extended view showing the animated floating orbs that create depth and visual interest.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '800px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Mobile view of the brand section.
 * On mobile devices, this section is typically hidden and only the form is shown.
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile viewport view. Note: In production, this section is hidden on mobile devices.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Tablet view of the brand section.
 * Shows responsive behavior on medium-sized screens.
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet viewport view showing responsive behavior on medium screens.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '3rem', display: 'flex', justifyContent: 'center', minHeight: '600px' }}>
        <Story />
      </div>
    ),
  ],
};
