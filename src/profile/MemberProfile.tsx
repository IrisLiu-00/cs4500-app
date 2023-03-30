import { Link, Grid, Typography, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import { StoryCard } from '../components/StoryCard';
import { StoryQuery, useStories } from '../hooks/useStories';
import { useTeam } from '../hooks/useTeams';
import { useUser } from '../hooks/useUser';
import { EditPanel } from './EditPanel';

const BoldText = styled('span')`
  font-weight: bold;
`;

export const MemberProfile = () => {
  const { user } = useUser();
  const { profileId } = useParams();
  const { user: profile } = useUser(profileId !== undefined ? parseInt(profileId) : undefined);
  const team = useTeam(profile?.teamId);
  const { stories } = useStories(StoryQuery.RECENT_USER, user?.id);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={3}>
        <Typography variant="h5">{profile?.displayName}</Typography>
        <Link variant="button" underline="none" sx={{ color: team?.color }} href={`/profile/${team?.leadId}`}>
          {team?.id}
        </Link>
        {user?.id === profile?.id && <EditPanel />}
      </Grid>
      <Grid item xs={12} md={9} sx={{ mt: 2 }}>
        <Typography gutterBottom>
          StoryLines <BoldText>{profile?.displayName}</BoldText> has added to:
        </Typography>
        <Grid container spacing={4}>
          {stories?.map((artInfo) => (
            <Grid item key={artInfo.id} xs={12} sm={6} md={4}>
              <StoryCard artInfo={artInfo} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
