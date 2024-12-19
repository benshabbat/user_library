'use client';

import { MailIcon, LocationIcon } from '../../icons';
import styles from './UserCard.module.scss';
import { User } from '@/types/user';

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  if (!user || !user.name || !user.location || !user.login) {
    return null;
  }

  const fullName = user.name ? 
    `${user.name.title || ''} ${user.name.first || ''} ${user.name.last || ''}`.trim() : 
    'Name Not Available';

  const address = user.location ? 
    `${user.location.street?.name || ''} ${user.location.street?.number || ''}, ${user.location.city || ''}, ${user.location.country || ''}`.trim() : 
    'Address Not Available';

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        {user.picture?.medium && (
          <img
            src={user.picture.medium}
            alt={fullName}
            className={styles.avatar}
          />
        )}
        <div className={styles.info}>
          <h2 className={styles.name}>{fullName}</h2>
          <div className={styles.detail}>
            <MailIcon />
            <span>{user.email || 'Email Not Available'}</span>
          </div>
          <div className={styles.detail}>
            <LocationIcon />
            <span>{address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
