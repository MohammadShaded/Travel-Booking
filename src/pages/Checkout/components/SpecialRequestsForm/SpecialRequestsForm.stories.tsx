import type { Meta, StoryObj } from '@storybook/react';
import SpecialRequestsForm from './SpecialRequestsForm';

const meta: Meta<typeof SpecialRequestsForm> = {
  title: 'Pages/Checkout/Components/SpecialRequestsForm',
  component: SpecialRequestsForm,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof SpecialRequestsForm>;

export const Empty: Story = {
  args: {
    value: '',
    onChange: (value) => console.log('Changed:', value),
  },
};

export const WithText: Story = {
  args: {
    value: 'Please provide a room on a high floor with a city view.',
    onChange: (value) => console.log('Changed:', value),
  },
};

export const NearMaxLength: Story = {
  args: {
    value: 'A'.repeat(495),
    onChange: (value) => console.log('Changed:', value),
  },
};

export const MaxLength: Story = {
  args: {
    value: 'A'.repeat(500),
    onChange: (value) => console.log('Changed:', value),
  },
};
