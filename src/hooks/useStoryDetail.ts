import useSWR, { Fetcher } from 'swr';
import { StoryDetail } from '../types';

type StoryResponse = {
  data: StoryDetail;
};

export function useStoryDetail(id: string = '0') {
  // TODO: paging and limits, does this need to be SWR??
  // probably omit the extra fields from query
  const { data, error, isLoading } = useSWR(`/details/${id}`, () => fetcher(id));
  const story = data?.data;
  if (story) {
    story.imageUrl = `https://www.artic.edu/iiif/2/${story.image_id}/full/843,/0/default.jpg`;
    story.lines = lines;
  }

  return {
    story: story,
    isLoading,
    isError: error,
  };
}

const fetcher: Fetcher<StoryResponse, string> = (id: string) =>
  fetch(
    `https://api.artic.edu/api/v1/artworks/${id}?fields=id,image_id,thumbnail,title,artist_display,date_display`
  ).then((r) => r.json());

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
