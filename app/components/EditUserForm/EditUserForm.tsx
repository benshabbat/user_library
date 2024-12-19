'use client';

import UserForm from '../UserForm/UserForm';
import { User, EditableUser } from '@/types/user';

interface EditUserFormProps {
  user: User;
  allUsers: User[];
  onSave: (editedUser: EditableUser) => void;
  onCancel: () => void;
}

export default function EditUserForm({ user, allUsers, onSave, onCancel }: EditUserFormProps) {
  const initialData: EditableUser = {
    name: user.name,
    email: user.email,
    location: user.location,
  };

  return (
    <UserForm
      initialData={initialData}
      allUsers={allUsers}
      onSave={onSave}
      onCancel={onCancel}
      currentUserId={user.login.uuid}
      submitLabel="Save Changes"
    />
  );
}