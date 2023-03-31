import { Typography, Grid, styled } from '@mui/material';
import { StoryCard } from '../components/StoryCard';
import { StorySummary } from '../types';

const Container = styled('div')`
  margin-bottom: 15px;
`;

export const StoryGrid = ({ header, stories }: { header: React.ReactNode; stories?: StorySummary[] }) => {
  if (!stories || !stories.length) return null;
  return (
    <Container>
      <Typography gutterBottom variant="h6">
        {header}
      </Typography>
      <Grid container spacing={4}>
        {stories?.map((artInfo) => (
          <Grid item key={artInfo.id} xs={12} sm={6} md={4}>
            <StoryCard artInfo={artInfo} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
