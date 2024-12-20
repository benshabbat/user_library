import { User, EditableUser } from "../../types/user";
import { useUsers } from "@/hooks/useUsers";
import Modal from "../Modal/Modal";
import UserForm from "../UserForm/UserForm";

interface NewUserFormProps {
  isOpen: boolean;
  setIsAddingUser: (isOpen: boolean) => void;
  allUsers?: User[];
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
  }
};

export default function NewUserForm({
  isOpen,
  setIsAddingUser,
}: NewUserFormProps) {
  const { createUser, users } = useUsers();
  
  const handleSave = async (userData: EditableUser & { imageUrl?: string }) => {
    try {
      console.log('Starting to create user:', userData); // Debug log
      
      const userToCreate: EditableUser = {
        name: userData.name,
        email: userData.email,
        location: userData.location,
        picture: {
          medium: userData.imageUrl || `/api/placeholder/100/100`
        }
      };

      console.log('Prepared user data:', userToCreate); // Debug log
      
      const result = await createUser(userToCreate);
      console.log('Create user result:', result); // Debug log
      
      setIsAddingUser(false);
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  };

  return (
    <Modal isOpen={isOpen} title="Add New User">
      <UserForm<EditableUser>
        initialData={DEFAULT_USER}
        allUsers={users}
        onSave={handleSave}
        onCancel={() => setIsAddingUser(false)}
        submitLabel="Add User"
      />
    </Modal>
  );
}