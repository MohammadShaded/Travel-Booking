import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import Checkout from './Checkout';
import type { CheckoutLocationState } from '@/types';

const mockNavigate = vi.fn();
const mockLocation = {
  state: {
    hotelName: 'Grand Plaza Hotel',
    roomType: 'Deluxe Suite',
    roomNumber: '101',
    checkInDate: '2025-12-01',
    checkOutDate: '2025-12-05',
    totalCost: 1200,
  } as CheckoutLocationState,
  pathname: '/checkout',
  search: '',
  hash: '',
  key: 'default',
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});

vi.mock('@/api/bookingService', () => ({
  createBooking: vi.fn().mockResolvedValue({
    customerName: 'John Doe',
    hotelName: 'Grand Plaza Hotel',
    roomNumber: '101',
    roomType: 'Deluxe Suite',
    bookingDateTime: '2025-11-28T10:30:00Z',
    totalCost: 1200,
    paymentMethod: 'creditCard',
    bookingStatus: 'confirmed',
    confirmationNumber: 'CONF-12345',
  }),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{component}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Checkout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render checkout form with booking summary', () => {
    renderWithRouter(<Checkout />);

    expect(screen.getByText('Complete Your Booking')).toBeInTheDocument();
    expect(screen.getByText('Booking Summary')).toBeInTheDocument();
    expect(screen.getByText('Grand Plaza Hotel')).toBeInTheDocument();
    expect(screen.getByText('Deluxe Suite')).toBeInTheDocument();
    
    // Step 1 should be visible initially
    expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
  });

  it('should display total cost in booking summary', () => {
    renderWithRouter(<Checkout />);

    expect(screen.getByText('$1200.00')).toBeInTheDocument();
  });

  it('should show validation errors when submitting empty form', async () => {
    renderWithRouter(<Checkout />);

    // Click Next on step 1 without filling form
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('should show error for invalid email format', async () => {
    renderWithRouter(<Checkout />);

    const nameInput = screen.getByPlaceholderText('Enter your full name');
    const emailInput = screen.getByPlaceholderText('your.email@example.com');
    const phoneInput = screen.getByPlaceholderText('+970 59 123-4567');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(phoneInput, { target: { value: '+970 59 123-4567' } });
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });
  });

  it('should allow form submission with valid data', async () => {
    const { createBooking } = await import('@/api/bookingService');
    renderWithRouter(<Checkout />);

    // Step 1: Fill personal details
    const nameInput = screen.getByPlaceholderText('Enter your full name');
    const emailInput = screen.getByPlaceholderText('your.email@example.com');
    const phoneInput = screen.getByPlaceholderText('+970 59 123-4567');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '+970591234567' } });

    // Go to step 2
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      // Payment method should be visible
      expect(screen.getByText('Credit Card')).toBeInTheDocument();
    });

    // Select credit card payment method
    const creditCardOption = screen.getByText('Credit Card').closest('label');
    if (creditCardOption) {
      const radioInput = creditCardOption.querySelector('input[type="radio"]');
      if (radioInput) {
        fireEvent.click(radioInput);
      }
    }

    // Go to step 3
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText('Review Your Information')).toBeInTheDocument();
    });

    // Submit booking
    const submitButton = screen.getByRole('button', { name: /confirm booking/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createBooking).toHaveBeenCalled();
    });

    // Check the first argument (booking data) - React Query passes additional context as second argument
    const mockFn = vi.mocked(createBooking);
    const callArgs = mockFn.mock.calls[0][0];
    expect(callArgs).toMatchObject({
      customerName: 'John Doe',
      hotelName: 'Grand Plaza Hotel',
      roomType: 'Deluxe Suite',
      paymentMethod: 'creditCard',
      checkInDate: expect.any(String),
      checkOutDate: expect.any(String),
      totalCost: expect.any(Number),
    });
  });

  it('should navigate to confirmation page on successful booking', async () => {
    renderWithRouter(<Checkout />);

    // Step 1
    const nameInput = screen.getByPlaceholderText('Enter your full name');
    const emailInput = screen.getByPlaceholderText('your.email@example.com');
    const phoneInput = screen.getByPlaceholderText('+970 59 123-4567');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '+970591234567' } });

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText('Credit Card')).toBeInTheDocument();
    });

    // Step 2 to 3
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText('Review Your Information')).toBeInTheDocument();
    });

    // Submit
    const submitButton = screen.getByRole('button', { name: /confirm booking/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/confirmation/CONF-12345',
        expect.objectContaining({
          state: expect.objectContaining({
            confirmationNumber: 'CONF-12345',
          }),
        })
      );
    });
  });

  it('should allow selecting different payment methods', async () => {
    renderWithRouter(<Checkout />);

    // Fill step 1 and go to step 2
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('+970 59 123-4567'), { target: { value: '+970591234567' } });

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText('PayPal')).toBeInTheDocument();
    });

    // Now we can select payment method
    const paypalOption = screen.getByText('PayPal').closest('label');
    if (paypalOption) {
      fireEvent.click(paypalOption);
    }
  });

  it('should allow entering special requests', async () => {
    renderWithRouter(<Checkout />);

    // Navigate to step 3
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('+970 59 123-4567'), { target: { value: '+970591234567' } });
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText('Credit Card')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      const textarea = screen.getByPlaceholderText(/any special requirements/i);
      fireEvent.change(textarea, { target: { value: 'High floor please' } });
      expect(textarea).toHaveValue('High floor please');
    });
  });

  it('should show character count for special requests', async () => {
    renderWithRouter(<Checkout />);

    // Navigate to step 3
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('+970 59 123-4567'), { target: { value: '+970591234567' } });
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText('Credit Card')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      const textarea = screen.getByPlaceholderText(/any special requirements/i);
      fireEvent.change(textarea, { target: { value: 'Test' } });
      expect(screen.getByText('4/500 characters')).toBeInTheDocument();
    });
  });

  it('should disable buttons while booking is in progress', async () => {
    // Mock createBooking with delay to capture pending state
    const { createBooking } = await import('@/api/bookingService');
    vi.mocked(createBooking).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              customerName: 'John Doe',
              hotelName: 'Grand Plaza Hotel',
              roomNumber: '101',
              roomType: 'Deluxe Suite',
              bookingDateTime: '2025-11-28T10:30:00Z',
              totalCost: 1200,
              paymentMethod: 'creditCard',
              bookingStatus: 'confirmed',
              confirmationNumber: 'CONF-12345',
            });
          }, 100);
        })
    );

    renderWithRouter(<Checkout />);

    // Navigate through all steps
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('+970 59 123-4567'), { target: { value: '+970591234567' } });
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText('Credit Card')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText('Review Your Information')).toBeInTheDocument();
    });

    const submitButton = screen.getByRole('button', { name: /confirm booking/i });
    fireEvent.click(submitButton);

    // Button text should change during processing
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /processing/i })).toBeDisabled();
    });
  });

  it('should navigate back when cancel button is clicked', () => {
    renderWithRouter(<Checkout />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
