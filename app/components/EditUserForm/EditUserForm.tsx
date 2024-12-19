'use client';

import UserForm from '../UserForm/UserForm';
import { User, EditableUser } from '@/types/user';

interface EditUserFormProps {
  user: User;
  allUsers: User[];
  onSave: (editedUser: User) => void;
  onCancel: () => void;
}

export default function EditUserForm({ user, allUsers, onSave, onCancel }: EditUserFormProps) {
  const handleSave = (userData: EditableUser & { imageUrl?: string }) => {
    console.log('Edit form received data:', userData);
    const updatedUser: User = {
      ...user,
      ...userData,
      picture: {
        medium: userData.imageUrl || user.picture.medium
      }
    };
    console.log('Sending updated user:', updatedUser);
    onSave(updatedUser);
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
      showImage={true}
    />
  );
}