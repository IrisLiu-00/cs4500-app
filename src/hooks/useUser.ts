import useSWR from 'swr';
import { User } from '../types';
import { API } from './api';

// TODO: consolidate these
export function useUser() {
  const { data, error, isLoading } = useSWR(`/users`, async () => await API.user.get());

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export function useUserById(userId?: number) {
  const { data, error, isLoading } = useSWR(`/users/${userId}`, async () => await API.user.get(userId));

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

const lead: User = {
  role: 'LEADER',
  id: 1,
  email: 'hello@email.com',
  password: 'pass123',
  teamId: 'The Panthers',
  displayName: 'userLead',
};

const member: User = {
  role: 'WRITER',
  id: 2,
  email: 'writer@email.com',
  password: 'member124',
  teamId: 'The Panthers',
  displayName: 'userMember',
};
