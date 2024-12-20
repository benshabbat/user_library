import { User } from '@/types/user';
import UserCard from '../UserCard/UserCard';
import styles from './UserGrid.module.scss';

interface UserGridProps {
  filteredUsers: User[];
  users: User[];
  onUpdate: (user: User) => void;
  onDelete: (userId: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export default function UserGrid({
  filteredUsers,
  users,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting
}: UserGridProps) {
  return (
    <div className={styles.grid}>
      {filteredUsers.map((user) =>
        user && user.login?.uuid ? (
          <UserCard
            key={user.login.uuid}
            user={user}
            allUsers={users}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isUpdating={isUpdating}
            isDeleting={isDeleting}
          />
        ) : null
      )}
    </div>
  );
}