import { Box, Divider, Grid, List, ListItem, ListItemButton, Stack, styled, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTeam } from '../hooks/useTeams';
import { useUser, useUserById } from '../hooks/useUser';
import { EditPanel } from './EditPanel';
import { EditTeamPanel } from './EditTeamPanel';
import { ColorSwatch } from './Styled';
const BoldText = styled('span')`
  font-weight: bold;
`;
const TeamName = styled(Typography)`
  text-transform: uppercase;
  font-weight: bold;
`;

export const LeaderProfile = () => {
  const { user } = useUser();
  const { profileId } = useParams();
  const { user: profile } = useUserById(profileId);
  const team = useTeam(profile?.teamId);
  const members = [
    // TODO: grab using endpoint
    {
      id: 2,
      displayName: 'userMember',
    },
    {
      id: 3,
      displayName: 'otherMember',
    },
  ];
  const canEdit = user?.id === profile?.id;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={3}>
        <TeamName variant="h5" sx={{ color: team?.color }} gutterBottom>
          {team?.id}
        </TeamName>
        <Typography>
          Moderated by <BoldText>{profile?.displayName}</BoldText>
        </Typography>
        <Typography>
          Score: <BoldText>{team?.score}</BoldText> points per member
        </Typography>
        {canEdit && <EditPanel />}
      </Grid>
      <Grid item xs={12} md={9}>
        {canEdit ? (
          <EditTeamPanel />
        ) : (
          <Stack>
            <Typography variant="h6" gutterBottom>
              About this team:
            </Typography>
            <Typography>{team?.description}</Typography>
            <ColorSwatch style={{ backgroundColor: team?.color }} />
          </Stack>
        )}
        <Typography>Team Members</Typography>
        <List>
          <Divider />
          {members.map((m) => (
            <Box key={m.id}>
              <ListItem disablePadding>
                <ListItemButton href={`/profile/${m.id}`}>{m.displayName}</ListItemButton>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
