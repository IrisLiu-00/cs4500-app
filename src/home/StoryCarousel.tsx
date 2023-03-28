import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box, styled, useMediaQuery, useTheme } from '@mui/material';
import { StoryQuery, useStories } from '../hooks/useStories';
import { StoryCard } from '../components/StoryCard';
import Carousel from 'react-material-ui-carousel';
import { useUser } from '../hooks/useUser';
import { User } from '../types';
import { useEffect, useState } from 'react';

const ChartContainer = styled(Box)`
  margin-top: 20px;
`;

export const StoryCarousel = () => {
  const { user } = useUser();

  const theme = useTheme();
  const overSm = useMediaQuery(theme.breakpoints.up('sm'));
  const overMd = useMediaQuery(theme.breakpoints.up('md'));

  const [storyQuery, setStoryQuery] = useState(getStoryQuery(undefined));
  useEffect(() => setStoryQuery(getStoryQuery(user)), [user]);
  const { stories } = useStories(storyQuery.queryType, storyQuery.param);
  const storyChunks = [];
  const chunkSize = overMd ? 4 : overSm ? 3 : 1;
  if (stories) {
    for (let i = 0; i < stories.length; i += chunkSize) {
      storyChunks.push(stories.slice(i, i + chunkSize));
    }
  }

  return (
    <>
      <Typography variant="h4">Recent Activity</Typography>
      {user && (
        <Typography variant="body1">
          {user?.role === 'LEADER' ? 'StoryLines your team has updated' : "StoryLines you've added to"}
        </Typography>
      )}
      <ChartContainer>
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
      </ChartContainer>
    </>
  );
};

const getStoryQuery = (user?: User) => {
  if (!user) {
    return { queryType: StoryQuery.RECENT_GLOBAL };
  } else if (user.role === 'LEADER') {
    return { queryType: StoryQuery.RECENT_TEAM, param: user.teamId };
  } else {
    return { queryType: StoryQuery.RECENT_USER, param: user.id };
  }
};
