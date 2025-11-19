import { FaCreditCard, FaPaypal, FaMoneyBillWave } from 'react-icons/fa';
import ErrorMessage from '@/components/common/ErrorMessage';
import styles from './PaymentMethodForm.module.css';

interface PaymentMethodFormProps {
  selectedMethod: string;
  error?: string;
  onChange: (method: string) => void;
}

const paymentMethods = [
  { id: 'creditCard', label: 'Credit Card', Icon: FaCreditCard },
  { id: 'paypal', label: 'PayPal', Icon: FaPaypal },
  { id: 'cash', label: 'Cash on Arrival', Icon: FaMoneyBillWave },
];

const PaymentMethodForm = ({ selectedMethod, error, onChange }: PaymentMethodFormProps) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Payment Method</h2>

      <div className={styles.methods}>
        {paymentMethods.map((method) => {
          const { Icon } = method;
          return (
            <label
              key={method.id}
              className={`${styles.methodCard} ${
                selectedMethod === method.id ? styles.selected : ''
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={(e) => onChange(e.target.value)}
                className={styles.radio}
              />
              <div className={styles.methodContent}>
                <Icon className={styles.icon} />
                <span className={styles.label}>{method.label}</span>
              </div>
              <div className={styles.checkmark}>{selectedMethod === method.id && '✓'}</div>
            </label>
          );
        })}
      </div>

      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default PaymentMethodForm;
