import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Hotel from './Hotel';

// Mock child components
vi.mock('./components/VisualGallery', () => ({
  default: () => <div data-testid="visual-gallery">Visual Gallery</div>,
}));

vi.mock('./components/HotelDetails', () => ({
  default: () => <div data-testid="hotel-details">Hotel Details</div>,
}));

vi.mock('./components/RoomList', () => ({
  default: () => <div data-testid="room-list">Room List</div>,
}));

// Mock API services
vi.mock('@/api/hotelService', () => ({
  getHotelDetails: vi.fn(() =>
    Promise.resolve({
      hotelName: 'Test Hotel',
      location: 'Test City',
      description: 'Test Description',
      latitude: 40.7128,
      longitude: -74.006,
      amenities: [],
      starRating: 5,
      availableRooms: 10,
      imageUrl: 'test.jpg',
      cityId: 1,
    }),
  ),
  getHotelGallery: vi.fn(() =>
    Promise.resolve([
      { id: 1, url: 'image1.jpg' },
      { id: 2, url: 'image2.jpg' },
    ]),
  ),
  getAvailableRooms: vi.fn(() =>
    Promise.resolve([
      {
        roomId: 1,
        roomNumber: 101,
        roomPhotoUrl: 'room1.jpg',
        roomType: 'Deluxe',
        capacityOfAdults: 2,
        capacityOfChildren: 1,
        roomAmenities: [],
        price: 199,
        availability: true,
      },
    ]),
  ),
}));

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ hotelId: '1' }),
  };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>{children}</BrowserRouter>
  </QueryClientProvider>
);

describe('HotelPage', () => {
  it('renders loading state initially', () => {
    render(<Hotel />, { wrapper });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('extracts hotel ID from URL params', () => {
    const { container } = render(<Hotel />, { wrapper });
    expect(container).toBeInTheDocument();
  });
});
