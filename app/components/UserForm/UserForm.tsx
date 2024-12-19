'use client';

import { useState } from 'react';
import styles from './UserForm.module.scss';
import { validateUser } from '../../utils/validators';
import { User, EditableUser, ValidationError } from '../../types/user';
import { FORM_FIELDS } from '../../constants/form.constants';
import { getNestedValue, updateNestedField } from '../../utils/form.utils';
import ImageUpload from '../ImageUpload/ImageUpload';
import { ErrorIcon } from '../../icons';

interface UserFormProps<T> {
  initialData: T;
  onSave: (data: T & { imageUrl?: string }) => Promise<void>;
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find(error => error.field === fieldName)?.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationErrors = validateUser(formData, allUsers, currentUserId);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      
      // Scroll to first error
      const firstErrorField = document.querySelector(`.${styles.error}`);
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    try {
      setErrors([]);
      await onSave({ ...formData, imageUrl });
    } catch (error) {
      setErrors([{ field: 'form', message: 'Failed to save user. Please try again.' }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = ({ target: { value, type } }: React.ChangeEvent<HTMLInputElement>, field: FormField) => {
    const parsedValue = type === 'number' ? parseInt(value) || 0 : value;
    updateField(field.name, parsedValue);
  };

  const updateField = (path: string, value: any) => {
    const fields = path.split('.');
    setFormData(prev => updateNestedField(prev, fields, value));
  };

  const handleImageSelect = (url: string) => {
    setImageUrl(url);
  };

  const renderField = (field: FormField) => {
    const { name, label, type = 'text', placeholder, fullWidth } = field;
    const errorMessage = getFieldError(name.split('.').pop()!);
    const hasError = !!errorMessage;

    return (
      <div 
        key={name}
        className={`${styles.formGroup} ${fullWidth ? styles.fullWidth : ''}`}
      >
        <label className={`${styles.label} ${hasError ? styles.hasError : ''}`}>
          {label}
        </label>
        <div className={styles.inputWrapper}>
          <input
            className={`${styles.input} ${hasError ? styles.error : ''}`}
            value={getNestedValue(formData, name)}
            onChange={(e) => handleInputChange(e, field)}
            placeholder={placeholder}
            type={type}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${name}-error` : undefined}
            disabled={isSubmitting}
          />
          {hasError && <ErrorIcon className={styles.errorIcon} />}
        </div>
        {hasError && (
          <span 
            className={styles.errorText}
            id={`${name}-error`}
            role="alert"
          >
            {errorMessage}
          </span>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {getFieldError('form') && (
        <div className={styles.formError} role="alert">
          {getFieldError('form')}
        </div>
      )}

      {showImage && (
        <div className={`${styles.formGroup} ${styles.fullWidth} ${styles.imageSection}`}>
          <label className={styles.label}>Profile Image</label>
          <ImageUpload
            onImageSelect={handleImageSelect}
            initialImage={imageUrl}
          />
        </div>
      )}

      {FORM_FIELDS.map(renderField)}

      <div className={styles.buttons}>
        <button 
          type="button" 
          className={styles.cancelButton} 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className={styles.saveButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}