import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ReviewCard from './index';
import type { Review } from '@/types';

describe('ReviewCard', () => {
  const mockReview: Review = {
    reviewId: 1,
    customerName: 'John Doe',
    rating: 4.5,
    description: 'Great hotel with excellent service!',
  };

  it('renders customer name', () => {
    render(<ReviewCard review={mockReview} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders review description', () => {
    render(<ReviewCard review={mockReview} />);
    expect(screen.getByText('Great hotel with excellent service!')).toBeInTheDocument();
  });

  it('displays customer avatar with first letter', () => {
    render(<ReviewCard review={mockReview} />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('displays rating value', () => {
    render(<ReviewCard review={mockReview} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('renders StarRating component', () => {
    render(<ReviewCard review={mockReview} />);
    // StarRating component should render with aria-label
    const starRating = screen.getByRole('img', { name: /4.5 out of 5 stars/i });
    expect(starRating).toBeInTheDocument();
  });

  it('handles customer name with lowercase letter', () => {
    const review: Review = {
      reviewId: 2,
      customerName: 'jane smith',
      rating: 5.0,
      description: 'Amazing stay!',
    };
    render(<ReviewCard review={review} />);
    expect(screen.getByText('J')).toBeInTheDocument(); // Should be uppercase
  });

  it('displays different ratings correctly', () => {
    const { rerender } = render(<ReviewCard review={mockReview} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();

    const newReview: Review = { ...mockReview, rating: 3.0 };
    rerender(<ReviewCard review={newReview} />);
    expect(screen.getByText('3.0')).toBeInTheDocument();
  });

  it('handles long review descriptions', () => {
    const longReview: Review = {
      reviewId: 3,
      customerName: 'Alice Johnson',
      rating: 5.0,
      description:
        'This is a very long review description that contains multiple sentences. The hotel was amazing, the staff were friendly, and the location was perfect. I would definitely recommend this place to anyone looking for a great stay!',
    };
    render(<ReviewCard review={longReview} />);
    expect(screen.getByText(longReview.description)).toBeInTheDocument();
  });

  it('renders with minimum rating (0)', () => {
    const minRatingReview: Review = {
      reviewId: 4,
      customerName: 'Bob Wilson',
      rating: 0,
      description: 'Not satisfied',
    };
    render(<ReviewCard review={minRatingReview} />);
    expect(screen.getByText('0.0')).toBeInTheDocument();
  });

  it('renders with maximum rating (5)', () => {
    const maxRatingReview: Review = {
      reviewId: 5,
      customerName: 'Carol Davis',
      rating: 5.0,
      description: 'Perfect in every way!',
    };
    render(<ReviewCard review={maxRatingReview} />);
    expect(screen.getByText('5.0')).toBeInTheDocument();
  });
});
