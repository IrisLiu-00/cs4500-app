import { Button, Container, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import { useUser } from '../hooks/useUser';
import { LeaderProfile } from './LeaderProfile';
import { MemberProfile } from './MemberProfile';
import { API } from '../hooks/api';

export const ProfilePage = () => {
  const { user, mutate } = useUser();
  const { profileId } = useParams();
  const { user: profile, isError } = useUser(profileId !== undefined ? parseInt(profileId) : undefined);

  const handleLogout = async () => {
    await API.user.logout();
    mutate();
  };

  return (
    <>
      <Nav />
      <main>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {!user && profileId === undefined ? (
            <LoginPrompt />
          ) : (
            <>
              <Stack flexDirection="row" justifyContent="space-between">
                <Typography variant="h4" gutterBottom>
                  Profile
                </Typography>
                {user?.id === profile?.id && <Button onClick={handleLogout}>Log Out</Button>}
              </Stack>
              {!isError ? (
                profile?.role === 'LEADER' ? (
                  <LeaderProfile />
                ) : (
                  <MemberProfile />
                )
              ) : (
                <Typography variant="h5" align="center">
                  That Profile can't be found.
                </Typography>
              )}
            </>
          )}
        </Container>
      </main>
    </>
  );
};

const LoginPrompt = () => {
  return (
    <Stack alignItems="center">
      <Typography variant="h5" textAlign="center" sx={{ mb: 4 }}>
        Log in to view your profile and add to StoryLines
      </Typography>
      <Button href="/login" variant="contained" size="large">
        Log In
      </Button>
    </Stack>
  );
};

/**
Member: 
- display name, team name (link to team profile), team points, # comments made?
- links to stories 
Lead:
- team name, mod name, team points, color, description
- list of team members + links

Private: email + password


Someone else’s profile - show number of stories in common?
 */
