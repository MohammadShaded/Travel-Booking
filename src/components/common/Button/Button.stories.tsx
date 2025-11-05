import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'Components/Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading spinner and disable button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button take full width of container',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary variants
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'medium',
  },
};

export const Danger: Story = {
  args: {
    children: 'Delete',
    variant: 'danger',
    size: 'medium',
  },
};

// Size variants
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'small',
    variant: 'primary',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'medium',
    variant: 'primary',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'large',
    variant: 'primary',
  },
};

// State variants
export const Loading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
    variant: 'primary',
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
    variant: 'primary',
    size: 'medium',
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
    variant: 'primary',
    size: 'medium',
  },
  parameters: {
    layout: 'padded',
  },
};

// Combined states
export const LoadingSecondary: Story = {
  args: {
    children: 'Processing...',
    isLoading: true,
    variant: 'secondary',
    size: 'medium',
  },
};

export const SmallDanger: Story = {
  args: {
    children: 'Remove',
    variant: 'danger',
    size: 'small',
  },
};

// Interactive example
export const WithClickHandler: Story = {
  args: {
    children: 'Click Me',
    variant: 'primary',
    size: 'medium',
    onClick: () => alert('Button clicked!'),
  },
};

// All sizes comparison
export const AllSizes: Story = {
  args: { children: 'Button' },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="small" variant="primary">
        Small
      </Button>
      <Button size="medium" variant="primary">
        Medium
      </Button>
      <Button size="large" variant="primary">
        Large
      </Button>
    </div>
  ),
};

// All variants comparison
export const AllVariants: Story = {
  args: { children: 'Button' },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};
