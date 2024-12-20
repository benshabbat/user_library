import axios from 'axios';
import { UserResponse } from '../types/User';

export const fetchUsers = async (): Promise<UserResponse> => {
  const { data } = await axios.get('https://randomuser.me/api/?results=10');
  return data;
};