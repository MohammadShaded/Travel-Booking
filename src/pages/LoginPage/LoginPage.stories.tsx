import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

/**
 * LoginPage - Complete authentication page with split-screen layout.
 * 
 * **Architecture:**
 * - **Left Section (BrandSection)**: TravelEase branding with animated logo, tagline, and feature list
 * - **Right Section (LoginForm)**: Authentication form with validation and error handling
 * 
 * **Component Structure:**
 * ```
 * LoginPage (70 lines - orchestration)
 * ├── BrandSection (logo, tagline, description)
 * │   └── FeatureList (3 features with animations)
 * └── LoginForm (Formik + Yup validation)
 *     ├── Input components (username, password)
 *     ├── Button component (submit)
 *     └── ErrorMessage component (API errors)
 * ```
 * 
 * **Features:**
 * - Split-screen responsive layout (hides left section on mobile)
 * - Dark ocean gradient background with floating orbs
 * - Glassmorphism effects on form container
 * - Real-time form validation
 * - Loading states during authentication
 * - Error handling with dismissible messages
 * - Smooth animations and transitions
 * - Professional typography and spacing
 * 
 * **State Management:**
 * - Uses Zustand store for auth state (token, userType)
 * - Redirects to home (/) or admin (/admin) based on userType
 * 
 * **Design System:**
 * - All components use CSS variables from design system
 * - Consistent colors, spacing, shadows, and transitions
 * - Inter font family with multiple weights
 */
const meta = {
  title: 'Pages/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Complete login page with modular component architecture, split-screen layout, animated branding, and form validation. Features glassmorphism effects, floating orbs, and professional animations.',
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default login page state - complete split-screen layout.
 * Left side shows branding with animated elements, right side shows the login form.
 */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complete login page with split-screen layout, animated branding, and authentication form. Try interacting with the form to see validation and animations.',
      },
    },
  },
};

/**
 * Mobile viewport - form-only view.
 * On mobile devices, the brand section is hidden to maximize form space.
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile view with brand section hidden. Form takes full width with optimized spacing for small screens.',
      },
    },
  },
};

/**
 * Tablet viewport - responsive layout.
 * Shows how the page adapts to medium-sized screens.
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet view showing responsive behavior. Brand section may be hidden or reduced based on screen size.',
      },
    },
  },
};

/**
 * Desktop large viewport - full experience.
 * Shows the complete design with all animations and effects visible.
 */
export const DesktopLarge: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Large desktop view showcasing the full split-screen design with floating orbs and all animations.',
      },
    },
  },
};

/**
 * Focus on animations - highlights all interactive elements.
 * Shows floating orbs, gradient shifts, hover effects, and transitions.
 */
export const AnimationShowcase: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Watch for: floating orbs (multiple speeds), pulsing logo, gradient text animation, feature card hovers, form input focus effects, and button shine effect.',
      },
    },
  },
};

/**
 * With error state - shows error message handling.
 * Demonstrates the ErrorMessage component in action.
 */
export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example showing how authentication errors are displayed. Note: This requires modifying the component state to trigger errors.',
      },
    },
  },
};

/**
 * Design system showcase - highlights all visual elements.
 * Shows the comprehensive use of design tokens throughout the page.
 */
export const DesignSystemShowcase: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complete view showcasing: dark ocean gradient, cyan accents, glassmorphism, typography scale, spacing system, shadows, and transitions from the design system.',
      },
    },
  },
};
