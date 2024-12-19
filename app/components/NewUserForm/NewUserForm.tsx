'use client';

import UserForm from '../UserForm/UserForm';
import { User, EditableUser } from '@/types/user';

interface NewUserFormProps {
  allUsers: User[];
  onSave: (newUser: User) => void;
  onCancel: () => void;
}

const DEFAULT_USER: EditableUser = {
  name: {
    title: '',
    first: '',
    last: '',
  },
  email: '',
  location: {
    street: {
      name: '',
      number: 0,
    },
    city: '',
    country: '',
  },
};

export default function NewUserForm({ allUsers, onSave, onCancel }: NewUserFormProps) {
  const handleSave = (userData: EditableUser & { imageUrl?: string }) => {
    const newUser: User = {
      login: {
        uuid: crypto.randomUUID(),
      },
      ...userData,
      picture: {
        medium: userData.imageUrl || `/api/placeholder/100/100`
      }
    };
    onSave(newUser);
  };

  return (
    <UserForm<EditableUser>
      initialData={DEFAULT_USER}
      allUsers={allUsers}
      onSave={handleSave}
      onCancel={onCancel}
      submitLabel="Add User"
    />
  );
}