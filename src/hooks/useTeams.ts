import { useMemo } from 'react';
import useSWR, { Fetcher } from 'swr';
import { Team } from '../types';
import { API } from './api';

export function useTeams() {
  const { data, error, isLoading } = useSWR(`/teams`, async () => await API.team.getAll());
  const teamsDict: { [key: string]: Team } = {};
  data?.forEach((t) => (teamsDict[t.id] = t));

  return {
    teams: data,
    teamsDict,
    isLoading,
    isError: error,
  };
}

export function useTeam(teamId?: string) {
  const { data, error, isLoading, mutate } = useSWR(`/teams/${teamId}`, async () =>
    teamId ? await API.team.get(teamId) : undefined
  );
  return {
    team: data,
    isLoading,
    isError: error,
    mutate,
  };
}
