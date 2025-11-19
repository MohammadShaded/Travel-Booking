import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HotelPage from './HotelPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

const meta: Meta<typeof HotelPage> = {
  title: 'Pages/HotelPage',
  component: HotelPage,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/hotel/1']}>
          <Routes>
            <Route path="/hotel/:hotelId" element={<Story />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HotelPage>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Full hotel page with gallery, details, map, and available rooms',
      },
    },
  },
};

export const LoadingState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Hotel page in loading state while fetching data',
      },
    },
  },
};
