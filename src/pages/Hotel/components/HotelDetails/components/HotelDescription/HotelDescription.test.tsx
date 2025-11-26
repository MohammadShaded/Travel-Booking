import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HotelDescription from './HotelDescription';

describe('HotelDescription', () => {
  it('renders the description text', () => {
    const description = 'This is a luxurious hotel with amazing amenities.';
    render(<HotelDescription description={description} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<HotelDescription description="Test description" />);
    expect(screen.getByText('About this Hotel')).toBeInTheDocument();
  });

  it('handles long descriptions', () => {
    const longDescription =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    render(<HotelDescription description={longDescription} />);
    expect(screen.getByText(longDescription)).toBeInTheDocument();
  });

  it('handles empty description', () => {
    render(<HotelDescription description="" />);
    expect(screen.getByText('About this Hotel')).toBeInTheDocument();
  });
});
