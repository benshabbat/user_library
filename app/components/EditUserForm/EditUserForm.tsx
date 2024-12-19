'use client';

import UserForm from '../UserForm/UserForm';
import { User, EditableUser } from '@/types/user.types';
import { BaseFormProps } from '@/types/form.types';

interface EditUserFormProps extends BaseFormProps<User> {
  user: User;
  allUsers: User[];
}

export default function EditUserForm({ user, allUsers, onSave, onCancel }: EditUserFormProps) {
  const handleSave = async (userData: EditableUser & { imageUrl?: string }) => {
    const updatedUser: User = {
      ...user,
      ...userData,
      picture: {
        medium: userData.imageUrl || user.picture.medium
      }
    };
    await onSave(updatedUser);
  };

  return (
    <UserForm<EditableUser>
      initialData={user}
      allUsers={allUsers}
      onSave={handleSave}
      onCancel={onCancel}
      currentUserId={user.login.uuid}
      submitLabel="Save Changes"
      initialImage={user.picture?.medium}
    />
  );
}