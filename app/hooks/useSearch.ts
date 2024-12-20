import { useState, useMemo } from 'react';
import { User } from '../types/user';

export function useSearch(users: User[]) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) {
      return users;
    }

    const query = searchQuery.toLowerCase().trim();
    return users.filter((user) => {
      const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`.toLowerCase();
      const location = `${user.location.street.name} ${user.location.city} ${user.location.country}`.toLowerCase();
      const searchFields = [
        fullName,
        user.email.toLowerCase(),
        user.login.uuid.toLowerCase(),
        location,
      ];

      return searchFields.some((field) => field.includes(query));
    });
  }, [users, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredUsers
  };
}