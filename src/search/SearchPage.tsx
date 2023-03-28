import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useSearchParams } from 'react-router-dom';
import Nav from '../components/Nav';
import { StoryCard } from '../components/StoryCard';
import { StoryQuery, useStories } from '../hooks/useStories';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('criteria');
  const { stories } = useStories(StoryQuery.SEARCH, query || '');

  return (
    <>
      <Nav />
      <main>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {!query && (
            <Typography variant="h5" align="center">
              Search for artworks to get started.
            </Typography>
          )}
          {query && (
            <Grid container spacing={4}>
              {stories?.map((artInfo) => (
                <Grid item key={artInfo.id} xs={12} sm={4} md={3}>
                  <StoryCard artInfo={artInfo} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </main>
    </>
  );
};
