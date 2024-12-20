"use client";

import UserCard from "../UserCard/UserCard";
import NewUserForm from "../NewUserForm/NewUserForm";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./UserList.module.scss";
import { useUsers } from "@/hooks/useUsers";
//TODO:TO TRY DRY HERE
export default function UserList() {
  const {
    filteredUsers,
    setSearchQuery,
    searchQuery,
    setIsAddingUser,
    isAddingUser,
    users,
    isLoading,
    error,
    updateUser,
    deleteUser,
    isUpdating,
    isDeleting,
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
        >
          Add User
        </button>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search by name, email, ID or location..."
      />

      <div className={styles.grid}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) =>
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
          )
        ) : (
          <div className={styles.noResults}>
            No users found matching your search.
          </div>
        )}
      </div>

      <NewUserForm
        allUsers={users}
        isOpen={isAddingUser}
        setIsAddingUser={setIsAddingUser}
      />
    </div>
  );
}
