import useSWR, { Fetcher } from 'swr';
import { Team } from '../types';

export function useTeams() {
  // TODO: paging and limits, does this need to be SWR??
  // probably omit the extra fields from query
  const { data, error, isLoading } = useSWR(`/teams`, fetcher);

  return {
    teams: data,
    isLoading,
    isError: error,
  };
}

// should be in order
const fetcher: Fetcher<Team[], string> = () =>
  Promise.resolve([
    { id: 'The Panthers', color: '#f25edc', description: 'Pink and pretty', score: 14.7 },
    { id: 'The Platypi', color: '#eb4034', description: 'The best team', score: 13.5 },
    { id: 'Stars', color: '#b9f25e', description: 'Shine the brightest', score: 8.86 },
    { id: 'The Cool Beans', color: '#2f699e', description: 'Cool in school', score: 2.27 },
  ]);
