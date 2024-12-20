import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, EditableUser } from '../types/user';
import { userService } from '../services/user.service';
import { useState } from "react";
import { useSearch } from './useSearch';

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export function useUsers() {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const queryClient = useQueryClient();

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: userKeys.lists(),
    queryFn: () => userService.fetchUsers(),
  });

  const { searchQuery, setSearchQuery, filteredUsers } = useSearch(users);

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

  return {
    filteredUsers,
    searchQuery,
    setSearchQuery,
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