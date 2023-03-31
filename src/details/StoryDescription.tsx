import { Box, Divider, IconButton, Tooltip, Typography, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useStoryDetail } from '../hooks/useStoryDetail';
import { useTeams } from '../hooks/useTeams';
import { StarBorder, StarRate } from '@mui/icons-material';
import { useUser } from '../hooks/useUser';
import { API } from '../hooks/api';

const FeatureButton = styled(IconButton)`
  padding: 0;
  margin-right: 5px;
`;

export const Description = () => {
  const { user } = useUser();
  const { storyId } = useParams();
  const { story, mutate } = useStoryDetail(Number(storyId));
  const { teamsDict } = useTeams();

  const isFeaturedForTeam = story?.featured.find((teamId) => teamId === user?.teamId);

  const handleToggleFeature = async () => {
    const storyNum = Number(storyId);
    if (isNaN(storyNum) || !user) return;
    await API.story.toggleFeature(storyNum, user?.teamId);
    mutate();
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {story?.title}
      </Typography>
      <Typography gutterBottom>{story?.artist_display}</Typography>
      <Typography gutterBottom>{story?.date_display}</Typography>

      {story && story.featured.length > 0 && (
        <>
          <Typography variant="caption">Features</Typography>
          <Box flexDirection="row">
            {story?.featured.map((teamId) => (
              <Tooltip title={teamId} key={teamId}>
                <StarRate sx={{ color: teamsDict[teamId]?.color }} />
              </Tooltip>
            ))}
          </Box>
        </>
      )}

      {user?.role === 'LEADER' && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box flexDirection="row" alignItems="center">
            <FeatureButton size="large" onClick={handleToggleFeature}>
              {isFeaturedForTeam ? (
                <StarRate fontSize="inherit" sx={{ color: teamsDict[user?.teamId]?.color }} />
              ) : (
                <StarBorder fontSize="inherit" sx={{ color: teamsDict[user?.teamId]?.color }} />
              )}
            </FeatureButton>
            Feature for your team
          </Box>
        </>
      )}
    </>
  );
};
