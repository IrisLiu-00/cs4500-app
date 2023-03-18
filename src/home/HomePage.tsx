import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Nav from '../components/Nav';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { TeamChart } from './TeamChart';
import { StoryCarousel } from './StoryCarousel';

const Header = styled(Box)`
  margin-top: 40px;
`;

export function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Header>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              StoryLine
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Collab with friends. Tell a story.
            </Typography>
          </Container>
        </Header>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <StoryCarousel />
          <TeamChart />
        </Container>
      </main>
    </>
  );
}
