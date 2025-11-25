import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Admin from './Admin';

// Mock the API service
vi.mock('@/api/adminService', () => ({
  getCities: vi.fn(async () => [
    { id: 1, name: 'New York', description: 'The Big Apple' },
    { id: 2, name: 'London', description: 'Capital of England' },
  ]),
  createCity: vi.fn(async (data) => [{ id: 3, ...data }]),
  updateCity: vi.fn(async (id, data) => [{ id, ...data }]),
  deleteCity: vi.fn(async () => []),
  getHotels: vi.fn(async () => [
    { id: 1, hotelName: 'Hotel 1', location: 'NYC', starRating: 5, availableRooms: 10 },
  ]),
  createHotel: vi.fn(async (data) => [{ id: 1, ...data }]),
  updateHotel: vi.fn(async (id, data) => [{ id, ...data }]),
  deleteHotel: vi.fn(async () => []),
  getRooms: vi.fn(async () => [
    { roomId: 1, roomNumber: 101, roomType: 'Deluxe', capacityOfAdults: 2, capacityOfChildren: 1, price: 150, availability: true },
  ]),
  createRoom: vi.fn(async (data) => [{ roomId: 1, ...data }]),
  updateRoom: vi.fn(async (id, data) => [{ roomId: id, ...data }]),
  deleteRoom: vi.fn(async () => []),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Admin', () => {
  it('renders admin panel title', () => {
    renderWithProviders(<Admin />);
    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    renderWithProviders(<Admin />);
    
    expect(screen.getByText('Manage Cities')).toBeInTheDocument();
    expect(screen.getByText('Manage Hotels')).toBeInTheDocument();
    expect(screen.getByText('Manage Rooms')).toBeInTheDocument();
  });

  it('toggles sidebar when toggle button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Admin />);

    const toggleButton = screen.getByLabelText(/close sidebar/i);
    await user.click(toggleButton);

    expect(screen.queryByText('Admin Panel')).not.toBeInTheDocument();
    expect(screen.getByLabelText(/open sidebar/i)).toBeInTheDocument();
  });

  it('renders cities grid by default', async () => {
    renderWithProviders(<Admin />);

    await waitFor(() => {
      expect(screen.getByText('Cities Management')).toBeInTheDocument();
    });
  });

  it('switches to hotels when hotels nav is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Admin />);

    const hotelsButton = screen.getByText('Manage Hotels');
    await user.click(hotelsButton);

    await waitFor(() => {
      expect(screen.getByText('Hotels Management')).toBeInTheDocument();
    });
  });

  it('switches to rooms when rooms nav is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Admin />);

    const roomsButton = screen.getByText('Manage Rooms');
    await user.click(roomsButton);

    await waitFor(() => {
      expect(screen.getByText('Rooms Management')).toBeInTheDocument();
    });
  });

  it('clears search query when switching entities', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Admin />);

    const searchInput = screen.getByPlaceholderText(/search cities/i);
    await user.type(searchInput, 'test query');

    const hotelsButton = screen.getByText('Manage Hotels');
    await user.click(hotelsButton);

    await waitFor(() => {
      const newSearchInput = screen.getByPlaceholderText(/search hotels/i);
      expect(newSearchInput).toHaveValue('');
    });
  });

  it('opens city form when create button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Admin />);

    await waitFor(() => {
      expect(screen.getByText('Cities Management')).toBeInTheDocument();
    });

    const createButton = screen.getByRole('button', { name: /create city/i });
    await user.click(createButton);

    expect(screen.getByText('Create New City')).toBeInTheDocument();
  });

  it('opens city form in edit mode when row is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Admin />);

    await waitFor(() => {
      expect(screen.getByText('New York')).toBeInTheDocument();
    });

    const row = screen.getByText('New York').closest('tr');
    if (row) await user.click(row);

    await waitFor(() => {
      expect(screen.getByText('Edit City')).toBeInTheDocument();
      expect(screen.getByDisplayValue('New York')).toBeInTheDocument();
    });
  });

  it('closes form when close button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Admin />);

    await waitFor(() => {
      expect(screen.getByText('Cities Management')).toBeInTheDocument();
    });

    const createButton = screen.getByRole('button', { name: /create city/i });
    await user.click(createButton);

    expect(screen.getByText('Create New City')).toBeInTheDocument();

    const closeButton = screen.getByLabelText(/close form/i);
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Create New City')).not.toBeInTheDocument();
    });
  });

  it('renders search input with correct placeholder', () => {
    renderWithProviders(<Admin />);
    expect(screen.getByPlaceholderText(/search cities/i)).toBeInTheDocument();
  });

  it('updates search input value', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Admin />);

    const searchInput = screen.getByPlaceholderText(/search cities/i);
    await user.type(searchInput, 'New York');

    expect(searchInput).toHaveValue('New York');
  });

  it('highlights active navigation item', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Admin />);

    const citiesButton = screen.getByText('Manage Cities').closest('button');
    expect(citiesButton?.className).toMatch(/active/);

    const hotelsButton = screen.getByText('Manage Hotels').closest('button');
    await user.click(hotelsButton!);

    await waitFor(() => {
      expect(hotelsButton?.className).toMatch(/active/);
      expect(citiesButton?.className).not.toMatch(/active/);
    });
  });
});
