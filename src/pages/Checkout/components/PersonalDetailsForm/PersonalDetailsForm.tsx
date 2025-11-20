import Input from '@/components/common/Input';
import ErrorMessage from '@/components/common/ErrorMessage';
import type { CheckoutFormData } from '@/types';
import styles from './PersonalDetailsForm.module.css';

interface PersonalDetailsFormProps {
  formData: CheckoutFormData;
  errors: Partial<CheckoutFormData>;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

const PersonalDetailsForm = ({
  formData,
  errors,
  onChange,
}: PersonalDetailsFormProps) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Personal Details</h2>

      <div className={styles.formGroup}>
        <label htmlFor="customerName" className={styles.label}>
          Full Name *
        </label>
        <Input
          id="customerName"
          type="text"
          value={formData.customerName}
          onChange={(e) => onChange('customerName', e.target.value)}
          placeholder="Enter your full name"
          error={errors.customerName}
        />
        {errors.customerName && (
          <ErrorMessage message={errors.customerName} />
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="customerEmail" className={styles.label}>
          Email Address *
        </label>
        <Input
          id="customerEmail"
          type="email"
          value={formData.customerEmail}
          onChange={(e) => onChange('customerEmail', e.target.value)}
          placeholder="your.email@example.com"
          error={errors.customerEmail}
        />
        {errors.customerEmail && (
          <ErrorMessage message={errors.customerEmail} />
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="customerPhone" className={styles.label}>
          Phone Number *
        </label>
        <Input
          id="customerPhone"
          type="tel"
          value={formData.customerPhone}
          onChange={(e) => onChange('customerPhone', e.target.value)}
          placeholder="+970 59 123-4567"
          error={errors.customerPhone}
        />
        {errors.customerPhone && (
          <ErrorMessage message={errors.customerPhone} />
        )}
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
