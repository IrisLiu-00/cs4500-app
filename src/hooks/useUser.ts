import useSWR from 'swr';
import { API } from './api';

export function useUser(userId?: number) {
  const { data, error, isLoading, mutate } = useSWR(`/users/${userId}`, async () => await API.user.get(userId));

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
}
