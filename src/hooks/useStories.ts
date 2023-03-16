import useSWR, { Fetcher } from 'swr';
import { ArtInfo } from '../types';

type ArtResponse = {
  data: ArtInfo[];
};

export function useStories() {
  // TODO: paging and limits, does this need to be SWR??
  // probably omit the extra fields from query
  const { data, error, isLoading } = useSWR(`/stories`, fetcher);
  data?.data.forEach((art) => {
    art.imageUrl = `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`;
    art.lines = 22;
    art.updatedAt = new Date(2023, 3, 21);
  });

  return {
    stories: data?.data,
    isLoading,
    isError: error,
  };
}

const fetcher: Fetcher<ArtResponse, string> = () =>
  fetch(
    'https://api.artic.edu/api/v1/artworks/search?q=cats&query[term][is_public_domain]=true&fields=id,image_id,thumbnail,title,artist_display,date_display'
  ).then((r) => r.json());
