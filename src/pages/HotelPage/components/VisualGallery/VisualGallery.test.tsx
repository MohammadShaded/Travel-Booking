import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VisualGallery from './VisualGallery';

// Mock the lightbox component
vi.mock('yet-another-react-lightbox', () => ({
  default: ({ open, close }: { open: boolean; close: () => void }) =>
    open ? (
      <div data-testid="lightbox" onClick={close}>
        Lightbox
      </div>
    ) : null,
}));

vi.mock('yet-another-react-lightbox/styles.css', () => ({}));

describe('VisualGallery', () => {
  const mockImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
    'https://example.com/image4.jpg',
    'https://example.com/image5.jpg',
    'https://example.com/image6.jpg',
  ];

  it('renders the main image', () => {
    const { container } = render(<VisualGallery images={mockImages} hotelName="Test Hotel" />);
    const mainImage = container.querySelector('img[alt="Test Hotel main view"]');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', mockImages[0]);
  });

  it('renders thumbnail images', () => {
    const { container } = render(<VisualGallery images={mockImages} hotelName="Test Hotel" />);
    const thumbnails = container.querySelectorAll('img[alt*="view"]');
    // Main image + 4 thumbnails
    expect(thumbnails.length).toBe(5);
  });

  it('displays "+X" overlay when there are more than 5 images', () => {
    render(<VisualGallery images={mockImages} hotelName="Test Hotel" />);
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('does not display "+X" overlay when there are 5 or fewer images', () => {
    const fewImages = mockImages.slice(0, 5);
    render(<VisualGallery images={fewImages} hotelName="Test Hotel" />);
    expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
  });

  it('opens lightbox when main image is clicked', async () => {
    const user = userEvent.setup();
    render(<VisualGallery images={mockImages} hotelName="Test Hotel" />);

    const mainImageWrapper = screen.getByAltText('Test Hotel main view').parentElement;
    expect(mainImageWrapper).toBeInTheDocument();

    if (mainImageWrapper) {
      await user.click(mainImageWrapper);
      // Wait for lightbox to appear
      await screen.findByTestId('lightbox');
      expect(screen.getByTestId('lightbox')).toBeInTheDocument();
    }
  });

  it('renders nothing when images array is empty', () => {
    const { container } = render(<VisualGallery images={[]} hotelName="Test Hotel" />);
    expect(container.firstChild).toBeNull();
  });

  it('displays "View Gallery" overlay on hover', () => {
    render(<VisualGallery images={mockImages} hotelName="Test Hotel" />);
    expect(screen.getByText('View Gallery')).toBeInTheDocument();
  });
});
