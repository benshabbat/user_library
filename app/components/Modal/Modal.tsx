'use client';

import { ReactNode } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}