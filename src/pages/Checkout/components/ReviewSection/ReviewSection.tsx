import type { CheckoutFormData } from '@/types';
import styles from './ReviewSection.module.css';

interface ReviewSectionProps {
  formData: CheckoutFormData;
}

const ReviewSection = ({ formData }: ReviewSectionProps) => {
  const getPaymentMethodLabel = (method: string): string => {
    switch (method) {
      case 'creditCard':
        return 'Credit Card';
      case 'paypal':
        return 'PayPal';
      case 'cash':
        return 'Cash on Arrival';
      default:
        return method;
    }
  };

  return (
    <div className={styles.reviewSection}>
      <h3 className={styles.reviewTitle}>Review Your Information</h3>
      <div className={styles.reviewGrid}>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Name</span>
          <span className={styles.reviewValue}>{formData.customerName}</span>
        </div>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Email</span>
          <span className={styles.reviewValue}>{formData.customerEmail}</span>
        </div>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Phone</span>
          <span className={styles.reviewValue}>{formData.customerPhone}</span>
        </div>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Payment Method</span>
          <span className={styles.reviewValue}>
            {getPaymentMethodLabel(formData.paymentMethod)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
