import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HotelAmenities from './HotelAmenities';

describe('HotelAmenities', () => {
  const mockAmenities = [
    { name: 'Wi-Fi', description: 'Free high-speed internet' },
    { name: 'Swimming Pool', description: 'Outdoor pool with city views' },
    { name: 'Gym', description: '24/7 fitness center' },
    { name: 'Parking', description: 'Free parking available' },
  ];

  it('renders amenity names', () => {
    render(<HotelAmenities amenities={mockAmenities} />);
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('Swimming Pool')).toBeInTheDocument();
    expect(screen.getByText('Gym')).toBeInTheDocument();
    expect(screen.getByText('Parking')).toBeInTheDocument();
  });

  it('renders amenity descriptions', () => {
    render(<HotelAmenities amenities={mockAmenities} />);
    expect(screen.getByText('Free high-speed internet')).toBeInTheDocument();
    expect(screen.getByText('Outdoor pool with city views')).toBeInTheDocument();
    expect(screen.getByText('24/7 fitness center')).toBeInTheDocument();
    expect(screen.getByText('Free parking available')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<HotelAmenities amenities={mockAmenities} />);
    expect(screen.getByText('Hotel Amenities')).toBeInTheDocument();
  });

  it('handles empty amenities array', () => {
    render(<HotelAmenities amenities={[]} />);
    expect(screen.getByText('Hotel Amenities')).toBeInTheDocument();
  });

  it('handles single amenity', () => {
    const singleAmenity = [{ name: 'Restaurant', description: 'On-site dining' }];
    render(<HotelAmenities amenities={singleAmenity} />);
    expect(screen.getByText('Restaurant')).toBeInTheDocument();
    expect(screen.getByText('On-site dining')).toBeInTheDocument();
  });

  it('renders all amenities in the grid', () => {
    render(<HotelAmenities amenities={mockAmenities} />);
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('Swimming Pool')).toBeInTheDocument();
    expect(screen.getByText('Gym')).toBeInTheDocument();
    expect(screen.getByText('Parking')).toBeInTheDocument();
  });
});
