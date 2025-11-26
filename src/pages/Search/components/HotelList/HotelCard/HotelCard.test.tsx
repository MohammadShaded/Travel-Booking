import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import HotelCard from './HotelCard';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const defaultProps = {
  hotelId: 1,
  hotelName: 'Grand Plaza Hotel',
  location: 'Paris, France',
  imageUrl: 'https://example.com/hotel.jpg',
  starRating: 4.5,
  price: 250,
  roomType: 'Deluxe Suite',
  description: 'Luxurious hotel in the heart of Paris',
  amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant'],
};

const renderHotelCard = (props = {}) => {
  return render(
    <MemoryRouter>
      <HotelCard {...defaultProps} {...props} />
    </MemoryRouter>
  );
};

describe('HotelCard', () => {
  it('renders hotel name', () => {
    renderHotelCard();
    expect(screen.getByText('Grand Plaza Hotel')).toBeInTheDocument();
  });

  it('renders location', () => {
    renderHotelCard();
    expect(screen.getByText('Paris, France')).toBeInTheDocument();
  });

  it('renders room type', () => {
    renderHotelCard();
    expect(screen.getByText('Deluxe Suite')).toBeInTheDocument();
  });

  it('renders description', () => {
    renderHotelCard();
    expect(screen.getByText('Luxurious hotel in the heart of Paris')).toBeInTheDocument();
  });

  it('renders price', () => {
    renderHotelCard();
    expect(screen.getByText('$250.00')).toBeInTheDocument();
    expect(screen.getByText('per night')).toBeInTheDocument();
  });

  it('renders star rating', () => {
    renderHotelCard();
    expect(screen.getByLabelText('4.5 out of 5 stars')).toBeInTheDocument();
  });

  it('renders hotel image', () => {
    renderHotelCard();
    const image = screen.getByAltText('Grand Plaza Hotel');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/hotel.jpg');
  });

  it('displays first 3 amenities', () => {
    renderHotelCard();
    expect(screen.getByText('Free WiFi')).toBeInTheDocument();
    expect(screen.getByText('Pool')).toBeInTheDocument();
    expect(screen.getByText('Spa')).toBeInTheDocument();
  });

  it('shows "+N more" for additional amenities', () => {
    renderHotelCard();
    expect(screen.getByText('+1 more')).toBeInTheDocument();
  });

  it('shows discount badge when discount is provided', () => {
    renderHotelCard({ discount: 20 });
    expect(screen.getByText('-20%')).toBeInTheDocument();
  });

  it('does not show discount badge when no discount', () => {
    renderHotelCard();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it('calculates and displays discounted price', () => {
    renderHotelCard({ discount: 20 });
    // 250 - 20% = 200
    expect(screen.getByText('$200.00')).toBeInTheDocument();
  });

  it('shows original price with strikethrough when discounted', () => {
    renderHotelCard({ discount: 20 });
    const originalPrice = screen.getByText('$250.00');
    expect(originalPrice.className).toContain('originalPrice');
  });

  it('renders View Details button', () => {
    renderHotelCard();
    expect(screen.getByRole('button', { name: /view details/i })).toBeInTheDocument();
  });

  it('navigates to hotel detail page when View Details is clicked', async () => {
    const user = userEvent.setup();
    renderHotelCard();
    
    const button = screen.getByRole('button', { name: /view details/i });
    await user.click(button);
    
    expect(mockNavigate).toHaveBeenCalledWith('/hotel/1');
  });

  it('does not render description when not provided', () => {
    renderHotelCard({ description: undefined });
    expect(screen.queryByText('Luxurious hotel in the heart of Paris')).not.toBeInTheDocument();
  });

  it('does not render amenities section when amenities array is empty', () => {
    const { container } = renderHotelCard({ amenities: [] });
    const amenitiesContainer = container.querySelector('.amenities');
    expect(amenitiesContainer).not.toBeInTheDocument();
  });
});
