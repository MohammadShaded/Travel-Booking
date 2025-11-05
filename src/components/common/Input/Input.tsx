import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
  fullWidth?: boolean;
}

export default function Input({
  label,
  error,
  touched,
  fullWidth = true,
  className = '',
  id,
  ...props
}: InputProps) {
  const hasError = touched && error;
  const inputId = id || props.name;

  const inputClasses = [
    styles.input,
    hasError && styles.inputError,
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`${styles.formGroup} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input id={inputId} className={inputClasses} {...props} />
      {hasError && (
        <div className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
