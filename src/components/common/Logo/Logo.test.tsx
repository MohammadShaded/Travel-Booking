import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Logo from './Logo';

describe('Logo', () => {
  it('renders brand name "TravelEase"', () => {
    render(<Logo />);
    expect(screen.getByText('TravelEase')).toBeInTheDocument();
  });

  it('renders tagline "Book Your Stay" by default', () => {
    render(<Logo />);
    expect(screen.getByText('Book Your Stay')).toBeInTheDocument();
  });

  it('hides text when showText is false', () => {
    render(<Logo showText={false} />);
    expect(screen.queryByText('TravelEase')).not.toBeInTheDocument();
  });

  it('renders small size variant', () => {
    const { container } = render(<Logo size="small" />);
    expect((container.firstChild as HTMLElement)?.className).toContain('small');
  });

  it('renders large size variant', () => {
    const { container } = render(<Logo size="large" />);
    expect((container.firstChild as HTMLElement)?.className).toContain('large');
  });

  it('renders SVG icon', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
