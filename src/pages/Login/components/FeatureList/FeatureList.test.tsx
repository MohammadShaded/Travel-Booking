import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FeatureList from './FeatureList';

describe('FeatureList', () => {
  it('renders all three features', () => {
    render(<FeatureList />);
    
    expect(screen.getByText('Best Price Guarantee')).toBeInTheDocument();
    expect(screen.getByText('24/7 Customer Support')).toBeInTheDocument();
    expect(screen.getByText('Secure Payments')).toBeInTheDocument();
  });

  it('renders checkmark icons for each feature', () => {
    const { container } = render(<FeatureList />);
    const icons = container.querySelectorAll('svg');
    
    // Should have 3 SVG icons (one per feature)
    expect(icons.length).toBe(3);
  });

  it('applies animation delay to features', () => {
    const { container } = render(<FeatureList />);
    const featureElements = container.querySelectorAll('[style*="animation-delay"]');
    
    // All 3 features should have animation delay
    expect(featureElements.length).toBe(3);
  });
});
