import React from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  /**
   * Checkbox label text
   */
  label: string;
  /**
   * Checked state
   */
  checked: boolean;
  /**
   * Change handler
   */
  onChange: (checked: boolean) => void;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Name attribute for form
   */
  name?: string;
  /**
   * Additional CSS class
   */
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  name,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label className={`${styles.checkboxContainer} ${disabled ? styles.disabled : ''} ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        className={styles.checkbox}
      />
      <span className={styles.checkmark}></span>
      <span className={styles.label}>{label}</span>
    </label>
  );
};

export default Checkbox;
