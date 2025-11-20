import type { Meta, StoryObj } from '@storybook/react';
import PaymentMethodForm from './PaymentMethodForm';

const meta: Meta<typeof PaymentMethodForm> = {
  title: 'Pages/Checkout/Components/PaymentMethodForm',
  component: PaymentMethodForm,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof PaymentMethodForm>;

export const CreditCardSelected: Story = {
  args: {
    selectedMethod: 'creditCard',
    onChange: (method) => console.log('Selected:', method),
  },
};

export const PayPalSelected: Story = {
  args: {
    selectedMethod: 'paypal',
    onChange: (method) => console.log('Selected:', method),
  },
};

export const CashSelected: Story = {
  args: {
    selectedMethod: 'cash',
    onChange: (method) => console.log('Selected:', method),
  },
};

export const WithError: Story = {
  args: {
    selectedMethod: '',
    error: 'Payment method is required',
    onChange: (method) => console.log('Selected:', method),
  },
};
