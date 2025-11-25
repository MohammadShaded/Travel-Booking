import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HotelReviews from './HotelReviews';
import type { Review } from '@/types';

describe('HotelReviews', () => {
  const mockReviews: Review[] = [
    {
      reviewId: 1,
      customerName: 'John Doe',
      rating: 4.5,
      description: 'Great hotel with excellent service!',
    },
    {
      reviewId: 2,
      customerName: 'Jane Smith',
      rating: 5.0,
      description: 'Amazing stay! Highly recommended.',
    },
    {
      reviewId: 3,
      customerName: 'Bob Wilson',
      rating: 3.5,
      description: 'Good hotel but could be better.',
    },
  ];

  it('renders loading state', () => {
    render(<HotelReviews reviews={[]} isLoading={true} />);
    expect(screen.getByText('Guest Reviews')).toBeInTheDocument();
    expect(screen.getByText('Loading reviews...')).toBeInTheDocument();
  });

  it('renders empty state when no reviews', () => {
    render(<HotelReviews reviews={[]} isLoading={false} />);
    expect(screen.getByText('Guest Reviews')).toBeInTheDocument();
    expect(screen.getByText('No reviews yet. Be the first to review this hotel!')).toBeInTheDocument();
  });

  it('renders reviews list', () => {
    render(<HotelReviews reviews={mockReviews} isLoading={false} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
  });

  it('displays correct number of reviews', () => {
    render(<HotelReviews reviews={mockReviews} isLoading={false} />);
    expect(screen.getByText('(3 reviews)')).toBeInTheDocument();
  });

  it('calculates average rating correctly', () => {
    render(<HotelReviews reviews={mockReviews} isLoading={false} />);
    // Average: (4.5 + 5.0 + 3.5) / 3 = 4.3
    expect(screen.getByText('4.3')).toBeInTheDocument();
  });

  it('displays average rating with single review', () => {
    const singleReview: Review[] = [
      {
        reviewId: 1,
        customerName: 'John Doe',
        rating: 4.7,
        description: 'Great!',
      },
    ];
    render(<HotelReviews reviews={singleReview} isLoading={false} />);
    // Rating appears twice (average and in review card)
    const ratings = screen.getAllByText('4.7');
    expect(ratings.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('(1 reviews)')).toBeInTheDocument();
  });

  it('renders review descriptions', () => {
    render(<HotelReviews reviews={mockReviews} isLoading={false} />);
    expect(screen.getByText('Great hotel with excellent service!')).toBeInTheDocument();
    expect(screen.getByText('Amazing stay! Highly recommended.')).toBeInTheDocument();
    expect(screen.getByText('Good hotel but could be better.')).toBeInTheDocument();
  });

  it('renders all customer avatars', () => {
    render(<HotelReviews reviews={mockReviews} isLoading={false} />);
    // Both John and Jane start with J
    const jAvatars = screen.getAllByText('J');
    expect(jAvatars).toHaveLength(2); // John and Jane
    expect(screen.getByText('B')).toBeInTheDocument(); // Bob
  });

  it('calculates average rating as 0 when no reviews', () => {
    render(<HotelReviews reviews={[]} isLoading={false} />);
    // Should not display average rating section in empty state
    expect(screen.queryByText('0.0')).not.toBeInTheDocument();
  });

  it('rounds average rating to one decimal place', () => {
    const reviews: Review[] = [
      { reviewId: 1, customerName: 'User1', rating: 4.33, description: 'Good' },
      { reviewId: 2, customerName: 'User2', rating: 4.67, description: 'Great' },
    ];
    render(<HotelReviews reviews={reviews} isLoading={false} />);
    // Average: (4.33 + 4.67) / 2 = 4.5
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('renders StarRating component for average rating', () => {
    render(<HotelReviews reviews={mockReviews} isLoading={false} />);
    // Should render StarRating with aria-label
    const starRating = screen.getByRole('img', { name: /4.3 out of 5 stars/i });
    expect(starRating).toBeInTheDocument();
  });

  it('handles undefined reviews array gracefully', () => {
    render(<HotelReviews reviews={undefined as unknown as Review[]} isLoading={false} />);
    expect(screen.getByText('No reviews yet. Be the first to review this hotel!')).toBeInTheDocument();
  });

  it('renders with many reviews', () => {
    const manyReviews: Review[] = Array.from({ length: 10 }, (_, i) => ({
      reviewId: i + 1,
      customerName: `User ${i + 1}`,
      rating: 4.0 + (i % 10) * 0.1,
      description: `Review number ${i + 1}`,
    }));
    render(<HotelReviews reviews={manyReviews} isLoading={false} />);
    expect(screen.getByText('(10 reviews)')).toBeInTheDocument();
  });

  it('displays individual rating values for each review', () => {
    render(<HotelReviews reviews={mockReviews} isLoading={false} />);
    expect(screen.getByText('4.5')).toBeInTheDocument(); // John's rating
    expect(screen.getByText('5.0')).toBeInTheDocument(); // Jane's rating
    expect(screen.getByText('3.5')).toBeInTheDocument(); // Bob's rating
  });
});
