import { useState, type InputHTMLAttributes } from 'react';
import { EyeIcon, EyeOffIcon } from '@/components/common/Icon';
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
  type,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const hasError = touched && error;
  const inputId = id || props.name;

  // Toggle between 'password' and 'text' for password fields
  const inputType = type === 'password' && showPassword ? 'text' : type;

  const inputClasses = [
    styles.input,
    hasError && styles.inputError,
    fullWidth && styles.fullWidth,
    type === 'password' && styles.passwordInput, // Add padding for toggle button
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
      <div className={styles.inputWrapper}>
        <input id={inputId} className={inputClasses} type={inputType} {...props} />

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.togglePassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {hasError && (
        <div className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
