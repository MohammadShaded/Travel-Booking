import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GuestsSelector from './GuestsSelector';

describe('GuestsSelector', () => {
  const defaultGuests = {
    adults: 2,
    children: 0,
    rooms: 1,
  };

  const mockSetGuests = vi.fn();

  it('should render all guest categories', () => {
    render(<GuestsSelector guests={defaultGuests} setGuests={mockSetGuests} />);

    expect(screen.getByText('Adults')).toBeInTheDocument();
    expect(screen.getByText('Ages 13 or above')).toBeInTheDocument();

    expect(screen.getByText('Children')).toBeInTheDocument();
    expect(screen.getByText('Ages 0-12')).toBeInTheDocument();

    expect(screen.getByText('Rooms')).toBeInTheDocument();
    expect(screen.getByText('Number of rooms')).toBeInTheDocument();
  });

  it('should display correct guest counts', () => {
    render(<GuestsSelector guests={defaultGuests} setGuests={mockSetGuests} />);

    const counterValues = screen.getAllByText(/^\d+$/);
    expect(counterValues[0]).toHaveTextContent('2'); // Adults
    expect(counterValues[1]).toHaveTextContent('0'); // Children
    expect(counterValues[2]).toHaveTextContent('1'); // Rooms
  });

  describe('Adults counter', () => {
    it('should increment adults when plus button is clicked', async () => {
      const user = userEvent.setup();
      render(<GuestsSelector guests={defaultGuests} setGuests={mockSetGuests} />);

      const incrementButtons = screen.getAllByRole('button', { name: '' });
      const adultsIncrementBtn = incrementButtons[1]; // Second button (first is decrement)

      await user.click(adultsIncrementBtn);

      expect(mockSetGuests).toHaveBeenCalledWith({
        adults: 3,
        children: 0,
        rooms: 1,
      });
    });

    it('should decrement adults when minus button is clicked', async () => {
      const user = userEvent.setup();
      render(<GuestsSelector guests={defaultGuests} setGuests={mockSetGuests} />);

      const decrementButtons = screen.getAllByRole('button', { name: '' });
      const adultsDecrementBtn = decrementButtons[0]; // First button

      await user.click(adultsDecrementBtn);

      expect(mockSetGuests).toHaveBeenCalledWith({
        adults: 1,
        children: 0,
        rooms: 1,
      });
    });

    it('should disable decrement button when adults count is 1', () => {
      render(<GuestsSelector guests={{ ...defaultGuests, adults: 1 }} setGuests={mockSetGuests} />);

      const decrementButtons = screen.getAllByRole('button', { name: '' });
      const adultsDecrementBtn = decrementButtons[0];

      expect(adultsDecrementBtn).toBeDisabled();
    });

    it('should disable increment button when adults count is 10', () => {
      render(
        <GuestsSelector guests={{ ...defaultGuests, adults: 10 }} setGuests={mockSetGuests} />
      );

      const incrementButtons = screen.getAllByRole('button', { name: '' });
      const adultsIncrementBtn = incrementButtons[1];

      expect(adultsIncrementBtn).toBeDisabled();
    });
  });

  describe('Children counter', () => {
    it('should increment children when plus button is clicked', async () => {
      const user = userEvent.setup();
      render(<GuestsSelector guests={defaultGuests} setGuests={mockSetGuests} />);

      const incrementButtons = screen.getAllByRole('button', { name: '' });
      const childrenIncrementBtn = incrementButtons[3]; // Fourth button

      await user.click(childrenIncrementBtn);

      expect(mockSetGuests).toHaveBeenCalledWith({
        adults: 2,
        children: 1,
        rooms: 1,
      });
    });

    it('should decrement children when minus button is clicked', async () => {
      const user = userEvent.setup();
      const guestsWithChildren = { ...defaultGuests, children: 2 };
      render(<GuestsSelector guests={guestsWithChildren} setGuests={mockSetGuests} />);

      const decrementButtons = screen.getAllByRole('button', { name: '' });
      const childrenDecrementBtn = decrementButtons[2]; // Third button

      await user.click(childrenDecrementBtn);

      expect(mockSetGuests).toHaveBeenCalledWith({
        adults: 2,
        children: 1,
        rooms: 1,
      });
    });

    it('should disable decrement button when children count is 0', () => {
      render(<GuestsSelector guests={defaultGuests} setGuests={mockSetGuests} />);

      const decrementButtons = screen.getAllByRole('button', { name: '' });
      const childrenDecrementBtn = decrementButtons[2];

      expect(childrenDecrementBtn).toBeDisabled();
    });

    it('should disable increment button when children count is 10', () => {
      render(
        <GuestsSelector guests={{ ...defaultGuests, children: 10 }} setGuests={mockSetGuests} />
      );

      const incrementButtons = screen.getAllByRole('button', { name: '' });
      const childrenIncrementBtn = incrementButtons[3];

      expect(childrenIncrementBtn).toBeDisabled();
    });
  });

  describe('Rooms counter', () => {
    it('should increment rooms when plus button is clicked', async () => {
      const user = userEvent.setup();
      render(<GuestsSelector guests={defaultGuests} setGuests={mockSetGuests} />);

      const incrementButtons = screen.getAllByRole('button', { name: '' });
      const roomsIncrementBtn = incrementButtons[5]; // Sixth button

      await user.click(roomsIncrementBtn);

      expect(mockSetGuests).toHaveBeenCalledWith({
        adults: 2,
        children: 0,
        rooms: 2,
      });
    });

    it('should decrement rooms when minus button is clicked', async () => {
      const user = userEvent.setup();
      const guestsWithMoreRooms = { ...defaultGuests, rooms: 2 };
      render(<GuestsSelector guests={guestsWithMoreRooms} setGuests={mockSetGuests} />);

      const decrementButtons = screen.getAllByRole('button', { name: '' });
      const roomsDecrementBtn = decrementButtons[4]; // Fifth button

      await user.click(roomsDecrementBtn);

      expect(mockSetGuests).toHaveBeenCalledWith({
        adults: 2,
        children: 0,
        rooms: 1,
      });
    });

    it('should disable decrement button when rooms count is 1', () => {
      render(<GuestsSelector guests={defaultGuests} setGuests={mockSetGuests} />);

      const decrementButtons = screen.getAllByRole('button', { name: '' });
      const roomsDecrementBtn = decrementButtons[4];

      expect(roomsDecrementBtn).toBeDisabled();
    });

    it('should disable increment button when rooms count is 10', () => {
      render(
        <GuestsSelector guests={{ ...defaultGuests, rooms: 10 }} setGuests={mockSetGuests} />
      );

      const incrementButtons = screen.getAllByRole('button', { name: '' });
      const roomsIncrementBtn = incrementButtons[5];

      expect(roomsIncrementBtn).toBeDisabled();
    });
  });
});
