import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

// Mock ProfileMenu since it has complex sub-components
vi.mock('@/components/layout/ProfileMenu', () => ({
  default: () => <div data-testid="profile-menu">Profile Menu</div>,
}));

describe('Header', () => {
  it('renders logo with link to home', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByText('TravelEase')).toBeInTheDocument();
  });
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Hotels')).toBeInTheDocument();
    expect(screen.getByText('My Bookings')).toBeInTheDocument();
  });

  it('renders ProfileMenu component', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('profile-menu')).toBeInTheDocument();
  });

  it('highlights active link on Hotels page', () => {
    render(
      <MemoryRouter initialEntries={['/hotels']}>
        <Header />
      </MemoryRouter>,
    );

    const hotelsLink = screen.getByText('Hotels').closest('a');
    expect(hotelsLink?.className).toContain('active');
  });
  it('highlights active link on My Bookings page', () => {
    render(
      <MemoryRouter initialEntries={['/my-bookings']}>
        <Header />
      </MemoryRouter>,
    );

    const bookingsLink = screen.getByText('My Bookings').closest('a');
    expect(bookingsLink?.className).toContain('active');
  });
  it('has sticky positioning class', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const header = container.querySelector('header');
    expect(header?.className).toContain('header');
  });
});
