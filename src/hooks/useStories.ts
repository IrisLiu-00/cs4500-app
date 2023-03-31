import useSWR from 'swr';
import { API } from './api';

export enum StoryQuery {
  SEARCH,
  FEATURE,
  RECENT_GLOBAL,
  RECENT_USER,
  RECENT_TEAM,
}

export function useStories(queryType: StoryQuery, param?: string | number) {
  // TODO: paging and limits
  const { key, fetcher } = getQuery(queryType, param);
  const { data, error, isLoading } = useSWR(key, fetcher);

  return {
    stories: data,
    isLoading,
    isError: error,
  };
}

function getQuery(queryType: StoryQuery, param?: string | number) {
  switch (queryType) {
    case StoryQuery.SEARCH:
      return { key: `/stories/search/${param}`, fetcher: async () => API.story.getSearch(param as string) };
    case StoryQuery.FEATURE:
      return { key: `/stories/featured/team/${param}`, fetcher: async () => API.story.getSearch(param as string) };
    case StoryQuery.RECENT_GLOBAL:
      return { key: `/stories/recent/global`, fetcher: async () => API.story.getRecentGlobal() };
    case StoryQuery.RECENT_USER:
      return {
        key: `/stories/recent/user/${param}`,
        fetcher: async () => (param === undefined ? undefined : API.story.getRecentForUser(param as number)),
      };
    case StoryQuery.RECENT_TEAM:
      return { key: `/stories/recent/team/${param}`, fetcher: async () => API.story.getRecentForTeam(param as number) };
  }
}
