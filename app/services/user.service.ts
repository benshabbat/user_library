import { User, EditableUser, ApiResponse } from '../types/user';

export const userService = {
  async fetchUsers(count: number = 10): Promise<User[]> {
    try {
      const response = await fetch(`https://randomuser.me/api/?results=${count}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { results }: ApiResponse = await response.json();
      return results;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  async updateUser(user: User): Promise<User> {
    // Simulating an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(user);
      }, 500);
    });
  },

  async createUser(userData: EditableUser): Promise<User> {
    // Simulating an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          ...userData,
          login: {
            uuid: crypto.randomUUID()
          },
          picture: {
            medium: userData.picture?.medium || `/api/placeholder/100/100`
          }
        };
        resolve(newUser);
      }, 500);
    });
  },

  async deleteUser(userId: string): Promise<void> {
    // Simulating an API call
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }
};