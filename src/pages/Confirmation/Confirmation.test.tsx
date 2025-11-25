import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import Confirmation from './Confirmation';
import type { BookingConfirmation } from '@/types';

const mockNavigate = vi.fn();
const mockBookingData: BookingConfirmation = {
  customerName: 'John Doe',
  hotelName: 'Grand Plaza Hotel',
  roomNumber: '101',
  roomType: 'Deluxe Suite',
  bookingDateTime: '2025-11-28T10:30:00Z',
  totalCost: 1200,
  paymentMethod: 'Credit Card',
  bookingStatus: 'confirmed',
  confirmationNumber: 'CONF-12345',
};

vi.mock('@/api/bookingService', () => ({
  getBookingById: vi.fn(() => Promise.resolve(mockBookingData)),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ bookingId: 'CONF-12345' }),
    useLocation: () => ({
      state: mockBookingData,
      pathname: '/confirmation/CONF-12345',
      search: '',
      hash: '',
      key: 'default',
    }),
  };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{component}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Confirmation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render booking confirmed message', async () => {
    renderWithRouter(<Confirmation />);

    expect(await screen.findByText('Booking Confirmed!')).toBeInTheDocument();
    expect(
      screen.getByText('Your reservation has been successfully confirmed')
    ).toBeInTheDocument();
  });

  it('should display confirmation number', () => {
    renderWithRouter(<Confirmation />);

    expect(screen.getByText('Confirmation Number')).toBeInTheDocument();
    expect(screen.getByText('CONF-12345')).toBeInTheDocument();
  });

  it('should display hotel details', () => {
    renderWithRouter(<Confirmation />);

    expect(screen.getByText('Grand Plaza Hotel')).toBeInTheDocument();
    expect(screen.getByText('Deluxe Suite')).toBeInTheDocument();
    expect(screen.getByText('101')).toBeInTheDocument();
  });

  it('should display guest information', () => {
    renderWithRouter(<Confirmation />);

    expect(screen.getByText('Guest Information')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should display payment details', () => {
    renderWithRouter(<Confirmation />);

    expect(screen.getByText('Payment Information')).toBeInTheDocument();
    expect(screen.getByText('Credit Card')).toBeInTheDocument();
    expect(screen.getByText('$1200.00')).toBeInTheDocument();
    expect(screen.getByText('confirmed')).toBeInTheDocument();
  });

  it('should have print confirmation button', () => {
    renderWithRouter(<Confirmation />);

    const printButton = screen.getByRole('button', {
      name: /print confirmation/i,
    });
    expect(printButton).toBeInTheDocument();
  });

  it('should have download PDF button', () => {
    renderWithRouter(<Confirmation />);

    const pdfButton = screen.getByRole('button', { name: /download pdf/i });
    expect(pdfButton).toBeInTheDocument();
  });

  it('should have return to home button', () => {
    renderWithRouter(<Confirmation />);

    const homeButton = screen.getByRole('button', { name: /return to home/i });
    expect(homeButton).toBeInTheDocument();
  });

  it('should call window.print when print button is clicked', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
    renderWithRouter(<Confirmation />);

    const printButton = screen.getByRole('button', {
      name: /print confirmation/i,
    });
    fireEvent.click(printButton);

    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });

  it('should call window.print when download PDF button is clicked', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
    renderWithRouter(<Confirmation />);

    const pdfButton = screen.getByRole('button', { name: /download pdf/i });
    fireEvent.click(pdfButton);

    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });

  it('should navigate to home when return button is clicked', () => {
    renderWithRouter(<Confirmation />);

    const homeButton = screen.getByRole('button', { name: /return to home/i });
    fireEvent.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should display confirmation email message', () => {
    renderWithRouter(<Confirmation />);

    expect(
      screen.getByText(
        /A confirmation email has been sent to your registered email address/i
      )
    ).toBeInTheDocument();
  });

  it('should display save confirmation number message', () => {
    renderWithRouter(<Confirmation />);

    expect(
      screen.getByText(
        /Please save your confirmation number for future reference/i
      )
    ).toBeInTheDocument();
  });
});
