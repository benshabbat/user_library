'use client';

import { useEffect, useState } from 'react';
import UserCard from '../UserCard/UserCard';
import Modal from '../Modal/Modal';
import NewUserForm from '../NewUserForm/NewUserForm';
import styles from './UserList.module.scss';
import { User } from '../../types/user';
import { userService } from '../../services/user.service';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const results = await userService.fetchUsers();
        setUsers(results);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleAddUser = async (newUser: User) => {
    try {
      await userService.createUser(newUser);
      setUsers(currentUsers => [...currentUsers, newUser]);
      setIsAddingUser(false);
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      await userService.updateUser(updatedUser);
      setUsers(currentUsers => 
        currentUsers.map(user => 
          user.login.uuid === updatedUser.login.uuid ? updatedUser : user
        )
      );
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await userService.deleteUser(userId);
      setUsers(currentUsers => 
        currentUsers.filter(user => user.login.uuid !== userId)
      );
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading users...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>User Library</h1>
        <button 
          className={styles.addButton}
          onClick={() => setIsAddingUser(true)}
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
              onUpdate={handleUpdateUser}
              onDelete={handleDeleteUser}
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
          onSave={handleAddUser}
          onCancel={() => setIsAddingUser(false)}
        />
      </Modal>
    </div>
  );
}