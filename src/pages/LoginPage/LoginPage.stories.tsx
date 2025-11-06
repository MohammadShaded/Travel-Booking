import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';


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
