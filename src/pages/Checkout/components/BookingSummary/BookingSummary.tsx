import type { CheckoutLocationState } from '@/types';
import styles from './BookingSummary.module.css';

interface BookingSummaryProps {
  bookingData: CheckoutLocationState;
}

const BookingSummary = ({ bookingData }: BookingSummaryProps) => {
  const checkIn = new Date(bookingData.checkInDate);
  const checkOut = new Date(bookingData.checkOutDate);
  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Booking Summary</h2>

      <div className={styles.card}>
        <div className={styles.section}>
          <h3 className={styles.hotelName}>{bookingData.hotelName}</h3>
          <p className={styles.roomType}>{bookingData.roomType}</p>
          <p className={styles.roomNumber}>Room {bookingData.roomNumber}</p>
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <div className={styles.dateRow}>
            <span className={styles.label}>Check-in</span>
            <span className={styles.value}>{formatDate(checkIn)}</span>
          </div>
          <div className={styles.dateRow}>
            <span className={styles.label}>Check-out</span>
            <span className={styles.value}>{formatDate(checkOut)}</span>
          </div>
          <div className={styles.dateRow}>
            <span className={styles.label}>Duration</span>
            <span className={styles.value}>
              {nights} {nights === 1 ? 'night' : 'nights'}
            </span>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.totalSection}>
          <span className={styles.totalLabel}>Total Amount</span>
          <span className={styles.totalValue}>
            ${bookingData.totalCost.toFixed(2)}
          </span>
        </div>
      </div>

      <p className={styles.note}>
        Your booking details will be sent to your email address after
        confirmation.
      </p>
    </div>
  );
};

export default BookingSummary;
