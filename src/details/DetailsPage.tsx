import { Container, Divider, Grid, List, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import { useStoryDetail } from '../hooks/useStoryDetail';
import { useUser } from '../hooks/useUser';
import { LineForm } from './LineForm';
import { LineItem } from './LineItem';

const Image = styled('img')`
  margin-bottom: 20px;
`;
const StyledGrid = styled(Grid)`
  @media (max-width: 900px) {
    margin: 0;
  }
`;

export const DetailsPage = () => {
  const theme = useTheme();
  const overMd = useMediaQuery(theme.breakpoints.up('md'));

  const { user } = useUser();
  const { storyId } = useParams();
  const { story, isError } = useStoryDetail(storyId);

  const Description = () => (
    <>
      <Typography variant="h5" gutterBottom>
        {story?.title}
      </Typography>
      <Typography gutterBottom>{story?.artist_display}</Typography>
      <Typography>{story?.date_display}</Typography>
    </>
  );
  // TODO: test error display
  return (
    <>
      <Nav />
      <main>
        <Container sx={{ py: 8, display: 'flex' }} maxWidth="lg">
          {!isError ? (
            <StyledGrid container spacing={4}>
              {overMd && <Grid item xs={0} md={2}></Grid>}
              <Grid item xs={12} md={7} sx={{ px: 4 }}>
                <Image src={story?.imageUrl} alt={story?.thumbnail.alt_text} width="100%" />
                {!overMd && <Description />}
                <List>
                  <Divider />
                  {story?.lines.map((line) => (
                    <LineItem line={line} key={`${line.user.id}+${line.timestamp.toString()}`} />
                  ))}
                  <LineForm />
                </List>
              </Grid>
              {overMd && (
                <Grid item md={3}>
                  <Description />
                </Grid>
              )}
            </StyledGrid>
          ) : (
            <Typography variant="h5" align="center">
              That Storyline can't be found.
            </Typography>
          )}
        </Container>
      </main>
    </>
  );
};
