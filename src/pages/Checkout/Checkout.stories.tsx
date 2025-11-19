import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Checkout from './Checkout';
import type { CheckoutLocationState } from '@/types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof Checkout> = {
  title: 'Pages/Checkout',
  component: Checkout,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Checkout>;

const createCheckoutStory = (bookingData: CheckoutLocationState): Story => ({
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[{ pathname: '/checkout', state: bookingData }]}>
          <Routes>
            <Route path="/checkout" element={<Story />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
});

export const Default: Story = createCheckoutStory({
  hotelName: 'Grand Plaza Hotel',
  roomType: 'Deluxe Suite',
  roomNumber: '101',
  checkInDate: '2025-12-01',
  checkOutDate: '2025-12-05',
  totalCost: 1200,
});

export const WithLongStay: Story = createCheckoutStory({
  hotelName: 'Beachfront Resort & Spa',
  roomType: 'Presidential Suite',
  roomNumber: '2001',
  checkInDate: '2025-12-01',
  checkOutDate: '2025-12-15',
  totalCost: 7000,
});

export const WithBudgetRoom: Story = createCheckoutStory({
  hotelName: 'Budget Inn Downtown',
  roomType: 'Standard Room',
  roomNumber: '105',
  checkInDate: '2025-12-01',
  checkOutDate: '2025-12-03',
  totalCost: 180,
});
