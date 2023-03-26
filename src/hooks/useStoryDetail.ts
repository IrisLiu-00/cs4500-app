import useSWR from 'swr';
import { StoryDetail } from '../types';
import { API } from './api';

type StoryResponse = {
  data: StoryDetail;
};

export function useStoryDetail(id: number) {
  // TODO: paging and limits, does this need to be SWR??
  // probably omit the extra fields from query
  const { data, error, isLoading, mutate } = useSWR(`/stories/${id}`, async () => API.story.get(id));

  return {
    story: data,
    isLoading,
    isError: error,
    mutate,
  };
}

const lines = [
  {
    text: 'It was a dark and stormy night...',
    timestamp: new Date(2023, 2, 21),
    user: { id: 2, teamId: 'The Panthers', displayName: 'userMember' },
  },
  {
    text: 'Then there was a knock at the door!',
    timestamp: new Date(2023, 2, 23),
    user: { id: 3, teamId: 'The Platypi', displayName: 'otherMember' },
  },
  {
    text: 'I opened the door to see a stranger standing there.',
    timestamp: new Date(2023, 2, 24),
    user: { id: 2, teamId: 'The Panthers', displayName: 'userMember' },
  },
  {
    text: 'I asked them, "who are you?"',
    timestamp: new Date(2023, 2, 25),
    user: { id: 3, teamId: 'The Platypi', displayName: 'otherMember' },
  },
];
