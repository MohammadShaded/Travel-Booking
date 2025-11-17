import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StarRating from './StarRating';

describe('StarRating', () => {
  it('renders 5 stars by default', () => {
    const { container } = render(<StarRating rating={3} />);
    const starsContainer = container.querySelector('[role="img"]');
    const stars = starsContainer?.textContent?.match(/★/g) || [];
    expect(stars).toHaveLength(5);
  });

  it('renders correct number of full stars', () => {
    const { getByLabelText } = render(<StarRating rating={4} />);
    const ariaLabel = getByLabelText('4 out of 5 stars');
    expect(ariaLabel).toBeInTheDocument();
    const stars = ariaLabel.textContent?.match(/★/g) || [];
    expect(stars).toHaveLength(5);
  });

  it('renders half star for decimal ratings', () => {
    const { getByLabelText } = render(<StarRating rating={3.5} />);
    const ariaLabel = getByLabelText('3.5 out of 5 stars');
    expect(ariaLabel).toBeInTheDocument();
    // 3 full + 1 half + 1 empty = 5 total stars
    const stars = ariaLabel.textContent?.match(/★/g) || [];
    expect(stars.length).toBeGreaterThanOrEqual(5);
  });

  it('renders empty stars for remaining space', () => {
    const { getByLabelText } = render(<StarRating rating={2} />);
    const ariaLabel = getByLabelText('2 out of 5 stars');
    expect(ariaLabel).toBeInTheDocument();
    // Should render 5 total stars (2 full + 3 empty)
    const stars = ariaLabel.textContent?.match(/★/g) || [];
    expect(stars).toHaveLength(5);
  });

  it('displays rating number when showNumber is true', () => {
    render(<StarRating rating={4.2} showNumber />);
    expect(screen.getByText('4.2')).toBeInTheDocument();
  });

  it('does not display rating number when showNumber is false', () => {
    render(<StarRating rating={4.2} showNumber={false} />);
    expect(screen.queryByText('4.2')).not.toBeInTheDocument();
  });

  it('applies small size class', () => {
    const { container } = render(<StarRating rating={3} size="small" />);
    const starRating = container.firstChild as HTMLElement;
    expect(starRating.className).toContain('small');
  });

  it('applies large size class', () => {
    const { container } = render(<StarRating rating={3} size="large" />);
    const starRating = container.firstChild as HTMLElement;
    expect(starRating.className).toContain('large');
  });

  it('applies custom className', () => {
    const { container } = render(<StarRating rating={3} className="custom-class" />);
    const starRating = container.firstChild as HTMLElement;
    expect(starRating.className).toContain('custom-class');
  });

  it('clamps rating to maxStars', () => {
    const { getByLabelText } = render(<StarRating rating={7} maxStars={5} />);
    const ariaLabel = getByLabelText('7 out of 5 stars');
    expect(ariaLabel).toBeInTheDocument();
    // Should clamp to 5 stars total
    const stars = ariaLabel.textContent?.match(/★/g) || [];
    expect(stars).toHaveLength(5);
  });

  it('clamps negative ratings to 0', () => {
    const { getByLabelText } = render(<StarRating rating={-2} />);
    const ariaLabel = getByLabelText('-2 out of 5 stars');
    expect(ariaLabel).toBeInTheDocument();
    // Should clamp to 0 and render 5 empty stars
    const stars = ariaLabel.textContent?.match(/★/g) || [];
    expect(stars).toHaveLength(5);
  });

  it('has accessible aria-label', () => {
    render(<StarRating rating={3.5} />);
    expect(screen.getByLabelText('3.5 out of 5 stars')).toBeInTheDocument();
  });
});
