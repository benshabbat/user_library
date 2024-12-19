'use client';

import styles from './ConfirmationDialog.module.scss';

interface ConfirmationDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

export default function ConfirmationDialog({ onConfirm, onCancel, message }: ConfirmationDialogProps) {
  return (
    <div className={styles.content}>
      <p className={styles.message}>{message}</p>
      <div className={styles.buttons}>
        <button 
          className={styles.cancelButton} 
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className={styles.deleteButton} 
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </div>
  );
}