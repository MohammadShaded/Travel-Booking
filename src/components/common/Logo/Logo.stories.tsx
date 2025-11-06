import type { Meta, StoryObj } from '@storybook/react';
import Logo from './Logo';

const meta = {
  title: 'Common/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
    variant: 'default',
    showText: true,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    variant: 'default',
    showText: true,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    variant: 'default',
    showText: true,
  },
};

export const WhiteVariant: Story = {
  args: {
    size: 'medium',
    variant: 'white',
    showText: true,
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'linear-gradient(135deg, #2c5364 0%, #203a43 50%, #0f2027 100%)', padding: '3rem', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

export const IconOnly: Story = {
  args: {
    size: 'medium',
    variant: 'default',
    showText: false,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start' }}>
      <Logo size="small" />
      <Logo size="medium" />
      <Logo size="large" />
    </div>
  ),
};
