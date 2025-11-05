import styles from './ErrorMessage.module.css';

export interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export default function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  return (
    <div className={styles.errorContainer} role="alert">
      <div className={styles.errorContent}>
        <span className={styles.errorIcon}>⚠️</span>
        <span className={styles.errorText}>{message}</span>
      </div>
      {onClose && (
        <button className={styles.closeButton} onClick={onClose} aria-label="Close error message">
          ✕
        </button>
      )}
    </div>
  );
}
