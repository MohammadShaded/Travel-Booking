import styles from './SpecialRequestsForm.module.css';

interface SpecialRequestsFormProps {
  value: string;
  onChange: (value: string) => void;
}

const SpecialRequestsForm = ({ value, onChange }: SpecialRequestsFormProps) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Special Requests (Optional)</h2>

      <textarea
        id="specialRequests"
        className={styles.textarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Any special requirements? (e.g., early check-in, high floor, accessible room)"
        rows={4}
        maxLength={500}
      />

      <p className={styles.hint}>
        {value.length}/500 characters
      </p>
    </div>
  );
};

export default SpecialRequestsForm;
