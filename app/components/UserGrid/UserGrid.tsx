"use client";

import UserCard from "../UserCard/UserCard";
export default function UserGrid({
  filteredUsers,
  users,
  updateUser,
  deleteUser,
  isUpdating,
  isDeleting,
}) {
  if (filteredUsers.length === 0) {
    return (
      <div className={styles.noResults}>
        No users found matching your search.
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {filteredUsers.map((user) =>
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
      )}
    </div>
  );
}
