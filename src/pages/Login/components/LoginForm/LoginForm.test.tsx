import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders username and password fields', () => {
    render(
      <BrowserRouter>
        <LoginForm onSubmit={mockOnSubmit} isLoading={false} />
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i, { selector: 'input' })).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(
      <BrowserRouter>
        <LoginForm onSubmit={mockOnSubmit} isLoading={false} />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields on submit', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginForm onSubmit={mockOnSubmit} isLoading={false} />
      </BrowserRouter>
    );
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    });
  });

  it('shows error for invalid username format', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginForm onSubmit={mockOnSubmit} isLoading={false} />
      </BrowserRouter>
    );
    
    const usernameInput = screen.getByLabelText(/username/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    await user.type(usernameInput, 'ab');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/username must be at least/i)).toBeInTheDocument();
    });
  });

  it('allows user to type in username and password fields', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginForm onSubmit={mockOnSubmit} isLoading={false} />
      </BrowserRouter>
    );
    
    const usernameInput = screen.getByLabelText(/username/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/password/i, { selector: 'input' }) as HTMLInputElement;
    
    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');
    
    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');
  });
});
