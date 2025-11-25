import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle, FaPrint, FaFilePdf, FaHome } from 'react-icons/fa';
import { getBookingById } from '@/api/bookingService';
import type { BookingConfirmation } from '@/types';
import Button from '@/components/common/Button';
import styles from './Confirmation.module.css';

const Confirmation = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Try to get confirmation data from location state first (from successful booking)
  const stateData = location.state as BookingConfirmation | undefined;

  const {
    data: bookingData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBookingById('1'),
  });

  const confirmation = stateData || bookingData;

  useEffect(() => {
    if (!bookingId) {
      navigate('/');
    }
  }, [bookingId, navigate]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading booking details...</div>
      </div>
    );
  }

  if (error || !confirmation) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>Booking Not Found</h1>
          <p>We could not find your booking. Please check your confirmation number.</p>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Success Header */}
        <div className={styles.header}>
          <div className={styles.successIcon}>
            <FaCheckCircle />
          </div>
          <h1 className={styles.title}>Booking Confirmed!</h1>
          <p className={styles.subtitle}>
            Your reservation has been successfully confirmed
          </p>
        </div>

        {/* Confirmation Card */}
        <div className={styles.card} id="confirmation-card">
          <div className={styles.confirmationNumber}>
            <span className={styles.label}>Confirmation Number</span>
            <span className={styles.number}>{confirmation.confirmationNumber}</span>
          </div>

          <div className={styles.divider} />

          {/* Hotel Details */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Hotel Details</h2>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Hotel Name</span>
              <span className={styles.detailValue}>{confirmation.hotelName}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Room Type</span>
              <span className={styles.detailValue}>{confirmation.roomType}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Room Number</span>
              <span className={styles.detailValue}>{confirmation.roomNumber}</span>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Guest Details */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Guest Information</h2>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Guest Name</span>
              <span className={styles.detailValue}>{confirmation.customerName}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Booking Date</span>
              <span className={styles.detailValue}>
                {formatDate(confirmation.bookingDateTime)}
              </span>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Payment Details */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Payment Information</h2>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Payment Method</span>
              <span className={styles.detailValue}>{confirmation.paymentMethod}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Total Amount</span>
              <span className={styles.totalAmount}>
                ${confirmation.totalCost.toFixed(2)}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Status</span>
              <span className={styles.status}>{confirmation.bookingStatus}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button variant="secondary" onClick={handlePrint}>
            <FaPrint className={styles.buttonIcon} />
            Print Confirmation
          </Button>
          <Button variant="secondary" onClick={handleDownloadPDF}>
            <FaFilePdf className={styles.buttonIcon} />
            Download PDF
          </Button>
          <Button variant="primary" onClick={() => navigate('/')}>
            <FaHome className={styles.buttonIcon} />
            Return to Home
          </Button>
        </div>

        {/* Additional Info */}
        <div className={styles.info}>
          <p className={styles.infoText}>
            A confirmation email has been sent to your registered email address.
          </p>
          <p className={styles.infoText}>
            Please save your confirmation number for future reference.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
