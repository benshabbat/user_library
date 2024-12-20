"use client";

import styles from "./UserList.module.scss";
import { useUsers } from "@/hooks/useUsers";
import NewUserForm from "../NewUserForm/NewUserForm";
import SearchBar from "../SearchBar/SearchBar";
import UserGrid from "../UserGrid/UserGrid";

export default function UserList() {
  const {
    filteredUsers,
    searchQuery,
    setSearchQuery,
    isAddingUser,
    setIsAddingUser,
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
    <>
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

        <UserGrid
          filteredUsers={filteredUsers}
          users={users}
          updateUser={updateUser}
          deleteUser={deleteUser}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
        />
      </div>

      <NewUserForm isOpen={isAddingUser} setIsAddingUser={setIsAddingUser} />
    </>
  );
}
