'use client';

import { useState } from 'react';
import styles from './UserCard.module.scss';
import { MailIcon, LocationIcon, EditIcon } from '../../icons';
import Modal from '../Modal/Modal';
import EditUserForm from '../EditUserForm/EditUserForm';
import { User } from '@/types/user';

interface UserCardProps {
  user: User;
  allUsers: User[];
  onUpdate: (updatedUser: User) => void;
}

export default function UserCard({ user: initialUser, allUsers, onUpdate }: UserCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(initialUser);

  if (!user || !user.name || !user.location || !user.login) {
    return null;
  }

  const fullName = `${user.name.title || ''} ${user.name.first || ''} ${user.name.last || ''}`.trim();
  const address = `${user.location.street?.name || ''} ${user.location.street?.number || ''}, ${user.location.city || ''}, ${user.location.country || ''}`.trim();

  const handleSave = (updatedUser: User) => {
    setUser(updatedUser);
    onUpdate(updatedUser);
    setIsEditing(false);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <img
            src={user.picture?.medium}
            alt={fullName}
            className={styles.avatar}
          />
          <div className={styles.info}>
            <div className={styles.nameContainer}>
              <h2 className={styles.name}>{fullName}</h2>
              <button 
                onClick={() => setIsEditing(true)}
                className={styles.editButton}
              >
                <EditIcon />
              </button>
            </div>
            <div className={styles.detail}>
              <MailIcon />
              <span>{user.email}</span>
            </div>
            <div className={styles.detail}>
              <LocationIcon />
              <span>{address}</span>
            </div>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit User Details"
      >
        <EditUserForm
          user={user}
          allUsers={allUsers}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      </Modal>
    </>
  );
}