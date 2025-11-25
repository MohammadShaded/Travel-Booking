import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HotelHeader from './HotelHeader';

describe('HotelHeader', () => {
  const mockProps = {
    name: 'Grand Plaza Hotel',
    location: 'New York, USA',
    starRating: 5,
    availableRooms: 12,
  };

  it('renders hotel name', () => {
    render(<HotelHeader {...mockProps} />);
    expect(screen.getByText('Grand Plaza Hotel')).toBeInTheDocument();
  });

  it('renders hotel location', () => {
    render(<HotelHeader {...mockProps} />);
    expect(screen.getByText('New York, USA')).toBeInTheDocument();
  });

  it('displays correct star rating', () => {
    render(<HotelHeader {...mockProps} />);
    const stars = screen.getAllByText('★');
    expect(stars).toHaveLength(5);
  });

  it('shows availability when rooms are available', () => {
    render(<HotelHeader {...mockProps} />);
    expect(screen.getByText('12 rooms available')).toBeInTheDocument();
  });

  it('shows sold out when no rooms are available', () => {
    render(<HotelHeader {...mockProps} availableRooms={0} />);
    expect(screen.getByText('0 rooms available')).toBeInTheDocument();
  });

  it('renders StarRating component with correct rating', () => {
    const { container } = render(<HotelHeader {...mockProps} starRating={3} />);
    const starRating = container.querySelector('[aria-label="3 out of 5 stars"]');
    expect(starRating).toBeInTheDocument();
  });

  it('renders StarRating component with zero rating', () => {
    const { container } = render(<HotelHeader {...mockProps} starRating={0} />);
    const starRating = container.querySelector('[aria-label="0 out of 5 stars"]');
    expect(starRating).toBeInTheDocument();
  });
});
