import type { Meta, StoryObj } from '@storybook/react';
import PersonalDetailsForm from './PersonalDetailsForm';

const meta: Meta<typeof PersonalDetailsForm> = {
  title: 'Pages/Checkout/Components/PersonalDetailsForm',
  component: PersonalDetailsForm,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof PersonalDetailsForm>;

export const Empty: Story = {
  args: {
    formData: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      paymentMethod: 'creditCard',
      specialRequests: '',
    },
    errors: {},
    onChange: (field, value) => console.log('Changed:', field, value),
  },
};

export const Filled: Story = {
  args: {
    formData: {
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      customerPhone: '+1 (555) 123-4567',
      paymentMethod: 'creditCard',
      specialRequests: '',
    },
    errors: {},
    onChange: (field, value) => console.log('Changed:', field, value),
  },
};

export const WithErrors: Story = {
  args: {
    formData: {
      customerName: '',
      customerEmail: 'invalid-email',
      customerPhone: '',
      paymentMethod: 'creditCard',
      specialRequests: '',
    },
    errors: {
      customerName: 'Name is required',
      customerEmail: 'Invalid email format',
      customerPhone: 'Phone number is required',
    },
    onChange: (field, value) => console.log('Changed:', field, value),
  },
};

export const PartiallyFilled: Story = {
  args: {
    formData: {
      customerName: 'John',
      customerEmail: '',
      customerPhone: '',
      paymentMethod: 'creditCard',
      specialRequests: '',
    },
    errors: {
      customerEmail: 'Email is required',
      customerPhone: 'Phone number is required',
    },
    onChange: (field, value) => console.log('Changed:', field, value),
  },
};
