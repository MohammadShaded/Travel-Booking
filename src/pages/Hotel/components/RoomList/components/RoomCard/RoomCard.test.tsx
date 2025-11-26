import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RoomCard from './RoomCard';
import type { Room } from '@/types';

describe('RoomCard', () => {
  const mockRoom: Room = {
    roomId: 1,
    roomNumber: 101,
    roomPhotoUrl: 'https://example.com/room.jpg',
    roomType: 'Deluxe Suite',
    capacityOfAdults: 2,
    capacityOfChildren: 1,
    roomAmenities: [
      { name: 'Wi-Fi', description: 'Free internet' },
      { name: 'TV', description: 'Smart TV' },
      { name: 'Mini Bar', description: 'Complimentary' },
      { name: 'Balcony', description: 'City view' },
    ],
    price: 199,
    availability: true,
  };

  const mockOnBookRoom = vi.fn();

  it('renders room type', () => {
    render(<RoomCard room={mockRoom} onBookRoom={mockOnBookRoom} />);
    expect(screen.getByText('Deluxe Suite')).toBeInTheDocument();
  });

  it('renders room number', () => {
    render(<RoomCard room={mockRoom} onBookRoom={mockOnBookRoom} />);
    expect(screen.getByText('Room 101')).toBeInTheDocument();
  });

  it('displays capacity for adults', () => {
    render(<RoomCard room={mockRoom} onBookRoom={mockOnBookRoom} />);
    expect(screen.getByText('2 Adults')).toBeInTheDocument();
  });

  it('displays capacity for children', () => {
    render(<RoomCard room={mockRoom} onBookRoom={mockOnBookRoom} />);
    expect(screen.getByText('1 Children')).toBeInTheDocument();
  });

  it('displays price per night', () => {
    render(<RoomCard room={mockRoom} onBookRoom={mockOnBookRoom} />);
    expect(screen.getByText('$199')).toBeInTheDocument();
    expect(screen.getByText('Per night')).toBeInTheDocument();
  });

  it('shows available badge', () => {
    render(<RoomCard room={mockRoom} onBookRoom={mockOnBookRoom} />);
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('shows not available button when room is not available', () => {
    const unavailableRoom = { ...mockRoom, availability: false };
    render(<RoomCard room={unavailableRoom} onBookRoom={mockOnBookRoom} />);
    expect(screen.getByText('Not Available')).toBeInTheDocument();
  });

  it('displays first 3 amenities', () => {
    render(<RoomCard room={mockRoom} onBookRoom={mockOnBookRoom} />);
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('TV')).toBeInTheDocument();
    expect(screen.getByText('Mini Bar')).toBeInTheDocument();
  });

  it('shows "+X more" for additional amenities', () => {
    render(<RoomCard room={mockRoom} onBookRoom={mockOnBookRoom} />);
    expect(screen.getByText('+1 more')).toBeInTheDocument();
  });

  it('calls onBookRoom with room ID when book button is clicked', async () => {
    const user = userEvent.setup();
    render(<RoomCard room={mockRoom} onBookRoom={mockOnBookRoom} />);

    const bookButton = screen.getByText('Book Now');
    await user.click(bookButton);

    expect(mockOnBookRoom).toHaveBeenCalledWith(1);
  });

  it('does not show "+X more" when 3 or fewer amenities', () => {
    const roomWithFewAmenities = {
      ...mockRoom,
      roomAmenities: mockRoom.roomAmenities.slice(0, 3),
    };
    render(<RoomCard room={roomWithFewAmenities} onBookRoom={mockOnBookRoom} />);
    expect(screen.queryByText(/\+\d+ more/)).not.toBeInTheDocument();
  });

  it('renders room image with correct alt text', () => {
    render(<RoomCard room={mockRoom} onBookRoom={mockOnBookRoom} />);
    const image = screen.getByAltText('Deluxe Suite');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/room.jpg');
  });

  it('handles 0 children capacity', () => {
    const roomNoChildren = { ...mockRoom, capacityOfChildren: 0 };
    render(<RoomCard room={roomNoChildren} onBookRoom={mockOnBookRoom} />);
    expect(screen.queryByText(/Child/)).not.toBeInTheDocument();
  });
});
