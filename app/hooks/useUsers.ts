import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, EditableUser } from '../types/user';
import { userService } from '../services/user.service';
import { useState, useMemo } from "react";
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export function useUsers() {

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const queryClient = useQueryClient();

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: userKeys.lists(),
    queryFn: () => userService.fetchUsers(),
  });

  const createUserMutation = useMutation({
    mutationFn: (newUser: EditableUser) => userService.createUser(newUser),
    onSuccess: (newUser) => {
      queryClient.setQueryData<User[]>(userKeys.lists(), (old = []) => [...old, newUser]);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (updatedUser: User) => userService.updateUser(updatedUser),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<User[]>(userKeys.lists(), (old = []) => 
        old.map(user => user.login.uuid === updatedUser.login.uuid ? updatedUser : user)
      );
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => userService.deleteUser(userId),
    onSuccess: (_, userId) => {
      queryClient.setQueryData<User[]>(userKeys.lists(), (old = []) => 
        old.filter(user => user.login.uuid !== userId)
      );
    },
  });


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


  return {
    filteredUsers,
    setSearchQuery,
    searchQuery,
    isAddingUser,
    setIsAddingUser,
    users,
    isLoading,
    error,
    createUser: createUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
  };
}