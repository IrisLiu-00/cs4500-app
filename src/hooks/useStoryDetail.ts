import useSWR from 'swr';
import { StoryDetail } from '../types';
import { API } from './api';

type StoryResponse = {
  data: StoryDetail;
};

export function useStoryDetail(id: number) {
  const { data, error, isLoading, mutate } = useSWR(`/stories/${id}`, async () => API.story.get(id));

  return {
    story: data,
    isLoading,
    isError: error,
    mutate,
  };
}
