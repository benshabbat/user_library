"use client";

import { useState, useMemo } from "react";
import UserCard from "../UserCard/UserCard";

import NewUserForm from "../NewUserForm/NewUserForm";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./UserList.module.scss";
import { useUsers } from "@/hooks/useUsers";

export default function UserList() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
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

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) {
      return users;
    }

    const query = searchQuery.toLowerCase().trim();
    return users.filter((user) => {
      const fullName =
        `${user.name.title} ${user.name.first} ${user.name.last}`.toLowerCase();
      const location =
        `${user.location.street.name} ${user.location.city} ${user.location.country}`.toLowerCase();
      const searchFields = [
        fullName,
        user.email.toLowerCase(),
        user.login.uuid.toLowerCase(),
        location,
      ];

      return searchFields.some((field) => field.includes(query));
    });
  }, [users, searchQuery]);

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

      <NewUserForm allUsers={users} isOpen={isAddingUser} setIsAddingUser={setIsAddingUser} />
    </div>
  );
}
