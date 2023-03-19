import useSWR, { Fetcher } from 'swr';
import { User } from '../types';

export function useUser() {
  const fetcher: Fetcher<User | null, string> = () => Promise.resolve(lead);

  const { data, error, isLoading } = useSWR(`/user`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export function useUserById(userId?: string) {
  const { data, error, isLoading } = useSWR(`/user/${userId}`, () => Promise.resolve(lead));

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

// TODO: backend should not return privates of other users

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
