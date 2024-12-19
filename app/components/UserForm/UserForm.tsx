'use client';

import { useState } from 'react';
import styles from './UserForm.module.scss';
import { validateUser, ValidationError } from '../../utils/validation';
import { User, EditableUser } from '@/types/user';
import ImageUpload from '../ImageUpload/ImageUpload';

interface UserFormProps<T> {
  initialData: T;
  onSave: (data: T & { imageUrl?: string }) => void;
  onCancel: () => void;
  allUsers?: User[];
  currentUserId?: string;
  submitLabel?: string;
  showImage?: boolean;
  initialImage?: string;
}

export default function UserForm<T extends EditableUser>({ 
  initialData, 
  onSave, 
  onCancel, 
  allUsers = [],
  currentUserId,
  submitLabel = 'Save',
  showImage = true,
  initialImage = initialData.picture?.medium || ''
}: UserFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [imageUrl, setImageUrl] = useState(initialImage);

  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find(error => error.field === fieldName)?.message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateUser(formData, allUsers, currentUserId);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors([]);
    onSave({ ...formData, imageUrl });
  };

  const updateField = <K extends keyof T>(
    field: K, 
    value: T[K] | string, 
    parent?: keyof T
  ) => {
    setFormData(prev => {
      if (parent) {
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [field]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {showImage && (
        <div className={`${styles.formGroup} ${styles.fullWidth} ${styles.imageSection}`}>
          <label className={styles.label}>Profile Image</label>
          <ImageUpload
            onImageSelect={(url) => setImageUrl(url)}
            initialImage={imageUrl}
          />
        </div>
      )}

      <div className={styles.formGroup}>
        <label className={styles.label}>Title</label>
        <input
          className={`${styles.input} ${getFieldError('title') ? styles.error : ''}`}
          value={formData.name.title}
          onChange={(e) => updateField('title', e.target.value, 'name')}
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
          value={formData.name.first}
          onChange={(e) => updateField('first', e.target.value, 'name')}
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
          value={formData.name.last}
          onChange={(e) => updateField('last', e.target.value, 'name')}
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
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
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
          value={formData.location.street.name}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              street: {
                ...prev.location.street,
                name: e.target.value
              }
            }
          }))}
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
          value={formData.location.street.number}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              street: {
                ...prev.location.street,
                number: parseInt(e.target.value) || 0
              }
            }
          }))}
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
          value={formData.location.city}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              city: e.target.value
            }
          }))}
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
          value={formData.location.country}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              country: e.target.value
            }
          }))}
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
          {submitLabel}
        </button>
      </div>
    </form>
  );
}