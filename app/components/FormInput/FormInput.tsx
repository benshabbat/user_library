'use client';

import styles from './FormInput.module.scss';

interface FormInputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'email';
  fullWidth?: boolean;
}

export default function FormInput({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
  fullWidth = false,
}: FormInputProps) {
  return (
    <div className={`${styles.formGroup} ${fullWidth ? styles.fullWidth : ''}`}>
      <label className={styles.label}>{label}</label>
      <input
        className={`${styles.input} ${error ? styles.error : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}