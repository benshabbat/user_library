export interface ValidationError {
  field: string;
  message: string;
}

export const validateUser = (user: any, allUsers: any[] = [], currentUserId?: string): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Name validations
  if (!user.name.title.trim()) {
    errors.push({ field: 'title', message: 'Title is required' });
  }

  if (!user.name.first.trim()) {
    errors.push({ field: 'first', message: 'First name is required' });
  } else if (user.name.first.trim().length < 3) {
    errors.push({ field: 'first', message: 'First name must be at least 3 characters' });
  }

  if (!user.name.last.trim()) {
    errors.push({ field: 'last', message: 'Last name is required' });
  } else if (user.name.last.trim().length < 3) {
    errors.push({ field: 'last', message: 'Last name must be at least 3 characters' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!user.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!emailRegex.test(user.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  } else {
    // Check for unique email
    const emailExists = allUsers.some(existingUser => 
      existingUser.email === user.email && existingUser.login?.uuid !== currentUserId
    );
    if (emailExists) {
      errors.push({ field: 'email', message: 'This email is already in use' });
    }
  }

  // Location validations
  if (!user.location.street.name.trim()) {
    errors.push({ field: 'streetName', message: 'Street name is required' });
  }

  if (!user.location.street.number) {
    errors.push({ field: 'streetNumber', message: 'Street number is required' });
  }

  if (!user.location.city.trim()) {
    errors.push({ field: 'city', message: 'City is required' });
  }

  if (!user.location.country.trim()) {
    errors.push({ field: 'country', message: 'Country is required' });
  }

  return errors;
};