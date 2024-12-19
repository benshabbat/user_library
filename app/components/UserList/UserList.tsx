'use client';

import { useEffect, useState } from 'react';
import UserCard from '../UserCard/UserCard';
import Modal from '../Modal/Modal';
import NewUserForm from '../NewUserForm/NewUserForm';
import styles from './UserList.module.scss';
import { User } from '@/types/user';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { results } = await response.json();
        if (results) {
          setUsers(results);
        } else {
          throw new Error('Invalid data format');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = (newUser: User) => {
    setUsers(currentUsers => [...currentUsers, newUser]);
    setIsAddingUser(false);
  };

  const handleUpdateUser = (updatedUser: User) => {
    console.log('Updating user with new data:', updatedUser);
    setUsers(currentUsers => 
      currentUsers.map(user => 
        user.login.uuid === updatedUser.login.uuid ? updatedUser : user
      )
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(currentUsers => currentUsers.filter(user => user.login.uuid !== userId));
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