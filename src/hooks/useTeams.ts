import { useMemo } from 'react';
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

export function useTeam(teamId?: string) {
  const { teams } = useTeams();
  const team = useMemo(() => {
    console.log('Running useTeam', teamId); // TODO: figure out how to memoize globally
    return teams?.find((t) => t.id === teamId);
  }, [teams, teamId]);
  return team;
} // maybe this is a api call too, return a full team info

// should be in order. backend calculates the score and leader?
const fetcher: Fetcher<Team[], string> = () =>
  Promise.resolve([
    { id: 'The Panthers', color: '#f25edc', description: 'Pink and pretty', score: 14.7, leadId: 1 },
    { id: 'The Platypi', color: '#eb4034', description: 'The best team', score: 13.5, leadId: 2 },
    { id: 'Stars', color: '#b9f25e', description: 'Shine the brightest', score: 8.86, leadId: 3 },
    { id: 'The Cool Beans', color: '#2f699e', description: 'Cool in school', score: 2.27, leadId: 4 },
  ]);
