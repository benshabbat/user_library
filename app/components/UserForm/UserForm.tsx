'use client';

import { useState } from 'react';
import styles from './UserForm.module.scss';
import { validateUser, ValidationError } from '../../utils/validation';
import { User, EditableUser } from '@/app/types/user';
import ImageUpload from '../ImageUpload/ImageUpload';

interface FormField {
  name: string;           
  label: string;         
  type?: string;         
  placeholder?: string;
  fullWidth?: boolean;
}

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

const FORM_FIELDS: FormField[] = [
  {
    name: 'name.title',
    label: 'Title',
    placeholder: 'e.g. Mr, Mrs, Ms'
  },
  {
    name: 'name.first',
    label: 'First Name',
    placeholder: 'First name'
  },
  {
    name: 'name.last',
    label: 'Last Name',
    placeholder: 'Last name'
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Email address',
    fullWidth: true
  },
  {
    name: 'location.street.name',
    label: 'Street Name',
    placeholder: 'Street name'
  },
  {
    name: 'location.street.number',
    label: 'Street Number',
    type: 'number',
    placeholder: 'Street number'
  },
  {
    name: 'location.city',
    label: 'City',
    placeholder: 'City'
  },
  {
    name: 'location.country',
    label: 'Country',
    placeholder: 'Country'
  }
];

const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
};

const updateNestedField = (obj: any, path: string[], value: any): any => {
  if (path.length === 1) {
    return { ...obj, [path[0]]: value };
  }
  
  const [current, ...rest] = path;
  return {
    ...obj,
    [current]: updateNestedField(obj[current], rest, value)
  };
};

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

    return (
      <div 
        key={name}
        className={`${styles.formGroup} ${fullWidth ? styles.fullWidth : ''}`}
      >
        <label className={styles.label}>{label}</label>
        <input
          className={`${styles.input} ${errorMessage ? styles.error : ''}`}
          value={getNestedValue(formData, name)}
          onChange={(e) => handleInputChange(e, field)}
          placeholder={placeholder}
          type={type}
          aria-invalid={!!errorMessage}
          aria-describedby={errorMessage ? `${name}-error` : undefined}
          disabled={isSubmitting}
        />
        {errorMessage && (
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