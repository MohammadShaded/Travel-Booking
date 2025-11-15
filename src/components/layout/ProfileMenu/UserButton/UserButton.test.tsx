import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import UserButton from './UserButton';
import { useAuthStore } from '@/store/useAuthStore';

// Mock the auth store
vi.mock('@/store/useAuthStore');

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('UserButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when user is not logged in', () => {
    beforeEach(() => {
      vi.mocked(useAuthStore).mockImplementation((selector) => {
        const state = {
          token: null,
          userType: null,
          userId: null,
          isLoading: false,
          error: null,
          login: vi.fn(),
          logout: vi.fn(),
          setAuth: vi.fn(),
          clearError: vi.fn(),
        };
        return selector(state);
      });
    });

    it('should render sign in button', () => {
      render(
        <MemoryRouter>
          <UserButton />
        </MemoryRouter>
      );

      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('should navigate to login page when sign in button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <UserButton />
        </MemoryRouter>
      );

      const signInButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(signInButton);

      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  describe('when user is logged in', () => {
    const mockLogout = vi.fn();

    beforeEach(() => {
      vi.mocked(useAuthStore).mockImplementation((selector) => {
        const state = {
          token: 'test-token',
          userType: 'User' as const,
          userId: 1,
          isLoading: false,
          error: null,
          login: vi.fn(),
          logout: mockLogout,
          setAuth: vi.fn(),
          clearError: vi.fn(),
        };
        return selector(state);
      });
    });

    it('should render user profile button with username', () => {
      render(
        <MemoryRouter>
          <UserButton />
        </MemoryRouter>
      );

      expect(screen.getByRole('button', { name: /user/i })).toBeInTheDocument();
      expect(screen.getByText('user')).toBeInTheDocument();
    });

    it('should show dropdown menu when profile button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <UserButton />
        </MemoryRouter>
      );

      const profileButton = screen.getByRole('button', { name: /user/i });
      await user.click(profileButton);

      expect(screen.getByRole('button', { name: /my bookings/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });

    it('should hide dropdown when profile button is clicked again', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <UserButton />
        </MemoryRouter>
      );

      const profileButton = screen.getByRole('button', { name: /user/i });
      
      // Open dropdown
      await user.click(profileButton);
      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();

      // Close dropdown
      await user.click(profileButton);
      expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
    });

    it('should close dropdown when My Bookings is clicked', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <UserButton />
        </MemoryRouter>
      );

      const profileButton = screen.getByRole('button', { name: /user/i });
      await user.click(profileButton);

      const bookingsButton = screen.getByRole('button', { name: /my bookings/i });
      await user.click(bookingsButton);

      expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
    });

    it('should call logout and navigate to home when logout is clicked', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <UserButton />
        </MemoryRouter>
      );

      const profileButton = screen.getByRole('button', { name: /user/i });
      await user.click(profileButton);

      const logoutButton = screen.getByRole('button', { name: /logout/i });
      await user.click(logoutButton);

      expect(mockLogout).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('should close dropdown when clicking outside', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <div>
            <UserButton />
            <div data-testid="outside">Outside element</div>
          </div>
        </MemoryRouter>
      );

      const profileButton = screen.getByRole('button', { name: /user/i });
      await user.click(profileButton);
      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();

      // Click outside
      const outsideElement = screen.getByTestId('outside');
      await user.click(outsideElement);

      expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
    });
  });
});
