import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input id="email" label="Email Address" />);
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
  });

  it('allows user to type text', async () => {
    const user = userEvent.setup();
    render(<Input id="username" label="Username" />);
    
    const input = screen.getByLabelText('Username');
    await user.type(input, 'john_doe');
    
    expect(input).toHaveValue('john_doe');
  });

  it('displays error message when error prop is provided', () => {
    render(<Input id="email" label="Email" error="Invalid email format" touched />);
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  it('shows password visibility toggle for password type', () => {
    render(<Input id="password" label="Password" type="password" />);
    
    // Should find the toggle button (eye icon)
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
  });

  it('toggles password visibility when eye icon is clicked', async () => {
    const user = userEvent.setup();
    render(<Input id="password" label="Password" type="password" />);
    
    const input = screen.getByLabelText('Password') as HTMLInputElement;
    const toggleButton = screen.getByRole('button');
    
    // Initially should be password type
    expect(input.type).toBe('password');
    
    // Click to show password
    await user.click(toggleButton);
    expect(input.type).toBe('text');
    
    // Click again to hide
    await user.click(toggleButton);
    expect(input.type).toBe('password');
  });

  it('calls onChange handler when value changes', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<Input id="search" label="Search" onChange={handleChange} />);
    
    const input = screen.getByLabelText('Search');
    await user.type(input, 'test');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays placeholder text', () => {
    render(<Input id="email" label="Email" placeholder="Enter your email" />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Input id="email" label="Email" disabled />);
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });
});
