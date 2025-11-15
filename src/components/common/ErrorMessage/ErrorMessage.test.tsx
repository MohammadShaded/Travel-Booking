import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders error message text', () => {
    render(<ErrorMessage message="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders with empty string message', () => {
    render(<ErrorMessage message="" />);
    // Empty message still renders container
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('applies correct CSS class for styling', () => {
    render(<ErrorMessage message="Error occurred" />);
    const alert = screen.getByRole('alert');
    expect(alert.className).toContain('errorContainer');
  });

  it('displays error icon', () => {
    render(<ErrorMessage message="Error occurred" />);
    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });
});

