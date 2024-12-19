'use client';

import { useState } from 'react';
import styles from './EditUserForm.module.scss';
import { validateUser, ValidationError } from '../../utils/validation';
import { User, EditableUser } from '@/types/user';

interface EditUserFormProps {
  user: User;
  allUsers: User[];
  onSave: (editedUser: EditableUser) => void;
  onCancel: () => void;
}

export default function EditUserForm({ user, allUsers, onSave, onCancel }: EditUserFormProps) {
  const [editedUser, setEditedUser] = useState<EditableUser>({
    name: user.name,
    email: user.email,
    location: user.location,
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find(error => error.field === fieldName)?.message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateUser(editedUser, allUsers, user.login.uuid);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors([]);
    onSave(editedUser);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Title</label>
        <input
          className={`${styles.input} ${getFieldError('title') ? styles.error : ''}`}
          value={editedUser.name.title}
          onChange={(e) => setEditedUser({
            ...editedUser,
            name: { ...editedUser.name, title: e.target.value }
          })}
          placeholder="e.g. Mr, Mrs, Ms"
        />
        {getFieldError('title') && (
          <span className={styles.errorText}>{getFieldError('title')}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>First Name</label>
        <input
          className={`${styles.input} ${getFieldError('first') ? styles.error : ''}`}
          value={editedUser.name.first}
          onChange={(e) => setEditedUser({
            ...editedUser,
            name: { ...editedUser.name, first: e.target.value }
          })}
          placeholder="First name"
        />
        {getFieldError('first') && (
          <span className={styles.errorText}>{getFieldError('first')}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Last Name</label>
        <input
          className={`${styles.input} ${getFieldError('last') ? styles.error : ''}`}
          value={editedUser.name.last}
          onChange={(e) => setEditedUser({
            ...editedUser,
            name: { ...editedUser.name, last: e.target.value }
          })}
          placeholder="Last name"
        />
        {getFieldError('last') && (
          <span className={styles.errorText}>{getFieldError('last')}</span>
        )}
      </div>

      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
        <label className={styles.label}>Email</label>
        <input
          className={`${styles.input} ${getFieldError('email') ? styles.error : ''}`}
          value={editedUser.email}
          onChange={(e) => setEditedUser({
            ...editedUser,
            email: e.target.value
          })}
          placeholder="Email address"
          type="text"
        />
        {getFieldError('email') && (
          <span className={styles.errorText}>{getFieldError('email')}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Street Name</label>
        <input
          className={`${styles.input} ${getFieldError('streetName') ? styles.error : ''}`}
          value={editedUser.location.street.name}
          onChange={(e) => setEditedUser({
            ...editedUser,
            location: {
              ...editedUser.location,
              street: { ...editedUser.location.street, name: e.target.value }
            }
          })}
          placeholder="Street name"
        />
        {getFieldError('streetName') && (
          <span className={styles.errorText}>{getFieldError('streetName')}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Street Number</label>
        <input
          className={`${styles.input} ${getFieldError('streetNumber') ? styles.error : ''}`}
          type="number"
          value={editedUser.location.street.number}
          onChange={(e) => setEditedUser({
            ...editedUser,
            location: {
              ...editedUser.location,
              street: { ...editedUser.location.street, number: parseInt(e.target.value) || 0 }
            }
          })}
          placeholder="Street number"
        />
        {getFieldError('streetNumber') && (
          <span className={styles.errorText}>{getFieldError('streetNumber')}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>City</label>
        <input
          className={`${styles.input} ${getFieldError('city') ? styles.error : ''}`}
          value={editedUser.location.city}
          onChange={(e) => setEditedUser({
            ...editedUser,
            location: { ...editedUser.location, city: e.target.value }
          })}
          placeholder="City"
        />
        {getFieldError('city') && (
          <span className={styles.errorText}>{getFieldError('city')}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Country</label>
        <input
          className={`${styles.input} ${getFieldError('country') ? styles.error : ''}`}
          value={editedUser.location.country}
          onChange={(e) => setEditedUser({
            ...editedUser,
            location: { ...editedUser.location, country: e.target.value }
          })}
          placeholder="Country"
        />
        {getFieldError('country') && (
          <span className={styles.errorText}>{getFieldError('country')}</span>
        )}
      </div>

      <div className={styles.buttons}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.saveButton}>
          Save Changes
        </button>
      </div>
    </form>
  );
}