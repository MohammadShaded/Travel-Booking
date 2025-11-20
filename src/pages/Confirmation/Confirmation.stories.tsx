import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Confirmation from './Confirmation';
import type { BookingConfirmation } from '@/types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof Confirmation> = {
  title: 'Pages/Confirmation',
  component: Confirmation,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Confirmation>;

const createConfirmationStory = (confirmationData: BookingConfirmation): Story => ({
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter
          initialEntries={[
            {
              pathname: `/confirmation/${confirmationData.confirmationNumber}`,
              state: confirmationData,
            },
          ]}
        >
          <Routes>
            <Route path="/confirmation/:bookingId" element={<Story />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
});

export const ConfirmedBooking: Story = createConfirmationStory({
  customerName: 'John Doe',
  hotelName: 'Grand Plaza Hotel',
  roomNumber: '101',
  roomType: 'Deluxe Suite',
  bookingDateTime: '2025-11-28T10:30:00Z',
  totalCost: 1200,
  paymentMethod: 'Credit Card',
  bookingStatus: 'confirmed',
  confirmationNumber: 'CONF-12345',
});


