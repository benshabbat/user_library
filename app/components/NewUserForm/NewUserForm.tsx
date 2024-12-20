"use client";

import UserForm from "../UserForm/UserForm";
import Modal from "../Modal/Modal";
import { User, EditableUser } from "../../types/user";
import { BaseFormProps } from "../../types/form";
import { useUsers } from "@/hooks/useUsers";
interface NewUserFormProps extends BaseFormProps<User> {
  allUsers: User[];
  isOpen: boolean;
  setIsAddingUser: any;
}

const DEFAULT_USER: EditableUser = {
  name: {
    title: "",
    first: "",
    last: "",
  },
  email: "",
  location: {
    street: {
      name: "",
      number: 0,
    },
    city: "",
    country: "",
  },
};

export default function NewUserForm({
  allUsers,
  isOpen,
  setIsAddingUser,
}: NewUserFormProps) {
  const { createUser } = useUsers();
  const handleSave = async (userData: EditableUser & { imageUrl?: string }) => {
    const newUser: User = {
      login: {
        uuid: crypto.randomUUID(),
      },
      ...userData,
      picture: {
        medium: userData.imageUrl || `/api/placeholder/100/100`,
      },
    };

    await createUser(newUser);

    setIsAddingUser(false);
  };

  return (
    <Modal isOpen={isOpen} title="Add New User">
      <UserForm<EditableUser>
        initialData={DEFAULT_USER}
        allUsers={allUsers}
        onSave={handleSave}
        onCancel={() => setIsAddingUser(false)}
        submitLabel="Add User"
      />
    </Modal>
  );
}
