import { MdAdd, MdRemove } from 'react-icons/md';
import styles from './GuestsSelector.module.css';

interface GuestsSelectorProps {
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
  setGuests: (guests: { adults: number; children: number; rooms: number }) => void;
}

export default function GuestsSelector({ guests, setGuests }: GuestsSelectorProps) {
  const handleIncrement = (field: keyof typeof guests) => {
    setGuests({ ...guests, [field]: guests[field] + 1 });
  };

  const handleDecrement = (field: keyof typeof guests, min: number = 0) => {
    if (guests[field] > min) {
      setGuests({ ...guests, [field]: guests[field] - 1 });
    }
  };

  return (
    <div className={styles.guestsSelector}>
      {/* Adults */}
      <div className={styles.guestRow}>
        <div className={styles.guestInfo}>
          <span className={styles.guestLabel}>Adults</span>
          <span className={styles.guestDesc}>Ages 13 or above</span>
        </div>
        <div className={styles.counter}>
          <button
            className={styles.counterButton}
            onClick={() => handleDecrement('adults', 1)}
            disabled={guests.adults <= 1}
          >
            <MdRemove />
          </button>
          <span className={styles.counterValue}>{guests.adults}</span>
          <button
            className={styles.counterButton}
            onClick={() => handleIncrement('adults')}
            disabled={guests.adults >= 10}
          >
            <MdAdd />
          </button>
        </div>
      </div>

      {/* Children */}
      <div className={styles.guestRow}>
        <div className={styles.guestInfo}>
          <span className={styles.guestLabel}>Children</span>
          <span className={styles.guestDesc}>Ages 0-12</span>
        </div>
        <div className={styles.counter}>
          <button
            className={styles.counterButton}
            onClick={() => handleDecrement('children')}
            disabled={guests.children <= 0}
          >
            <MdRemove />
          </button>
          <span className={styles.counterValue}>{guests.children}</span>
          <button
            className={styles.counterButton}
            onClick={() => handleIncrement('children')}
            disabled={guests.children >= 10}
          >
            <MdAdd />
          </button>
        </div>
      </div>

      {/* Rooms */}
      <div className={styles.guestRow}>
        <div className={styles.guestInfo}>
          <span className={styles.guestLabel}>Rooms</span>
          <span className={styles.guestDesc}>Number of rooms</span>
        </div>
        <div className={styles.counter}>
          <button
            className={styles.counterButton}
            onClick={() => handleDecrement('rooms', 1)}
            disabled={guests.rooms <= 1}
          >
            <MdRemove />
          </button>
          <span className={styles.counterValue}>{guests.rooms}</span>
          <button
            className={styles.counterButton}
            onClick={() => handleIncrement('rooms')}
            disabled={guests.rooms >= 10}
          >
            <MdAdd />
          </button>
        </div>
      </div>
    </div>
  );
}
