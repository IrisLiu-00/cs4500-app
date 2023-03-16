import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Nav from '../components/Nav';
import { styled } from '@mui/material/styles';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useStories } from '../hooks/useStories';
import { StoryCard } from '../components/StoryCard';
import Carousel from 'react-material-ui-carousel';

const Header = styled(Box)`
  margin-top: 40px;
`;

export function HomePage() {
  const theme = useTheme();
  const overSm = useMediaQuery(theme.breakpoints.up('sm'));
  const overMd = useMediaQuery(theme.breakpoints.up('md'));

  const { stories } = useStories();
  const storyChunks = [];
  const chunkSize = overMd ? 4 : overSm ? 3 : 1;
  if (stories) {
    for (let i = 0; i < stories.length; i += chunkSize) {
      storyChunks.push(stories.slice(i, i + chunkSize));
    }
  }

  return (
    <>
      <Nav />
      <main>
        <Header>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              Storyline
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Collab with friends. Tell a story.
            </Typography>
          </Container>
        </Header>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Recent Stories
          </Typography>
          <Carousel autoPlay={false} animation="slide" indicators={false} navButtonsAlwaysVisible={true}>
            {storyChunks.map((chunk, idx) => (
              <Grid container spacing={4} key={idx}>
                {chunk?.map((artInfo) => (
                  <Grid item key={artInfo.id} xs={12} sm={4} md={3}>
                    <StoryCard artInfo={artInfo} />
                  </Grid>
                ))}
              </Grid>
            ))}
          </Carousel>
        </Container>
      </main>
    </>
  );
}

// TODO: graph, mobile friendly
