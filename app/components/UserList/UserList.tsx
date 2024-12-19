'use client';

import { useState } from 'react';
import UserCard from '../UserCard/UserCard';
import Modal from '../Modal/Modal';
import NewUserForm from '../NewUserForm/NewUserForm';
import styles from './UserList.module.scss';
import { useUsers } from '../../hooks/useUsers';
import { User } from '../../types/user';

export default function UserList() {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const { 
    users, 
    isLoading, 
    error, 
    createUser, 
    updateUser, 
    deleteUser,
    isCreating,
    isUpdating,
    isDeleting
  } = useUsers();

  if (isLoading) {
    return <div className={styles.loading}>Loading users...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error loading users</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>User Library</h1>
        <button 
          className={styles.addButton}
          onClick={() => setIsAddingUser(true)}
          disabled={isCreating}
        >
          Add User
        </button>
      </div>

      <div className={styles.grid}>
        {users.map((user) => (
          user && user.login?.uuid ? (
            <UserCard 
              key={user.login.uuid} 
              user={user} 
              allUsers={users}
              onUpdate={updateUser}
              onDelete={deleteUser}
              isUpdating={isUpdating}
              isDeleting={isDeleting}
            />
          ) : null
        ))}
      </div>

      <Modal 
        isOpen={isAddingUser}
        onClose={() => setIsAddingUser(false)}
        title="Add New User"
      >
        <NewUserForm
          allUsers={users}
          onSave={(user) => {
            createUser(user);
            setIsAddingUser(false);
          }}
          onCancel={() => setIsAddingUser(false)}
          isSubmitting={isCreating}
        />
      </Modal>
    </div>
  );
}