import { Button, Container, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import { useUser, useUserById } from '../hooks/useUser';
import { LeaderProfile } from './LeaderProfile';
import { MemberProfile } from './MemberProfile';

// TODO: logout behavior
export const ProfilePage = () => {
  const { user } = useUser();
  const { profileId } = useParams();
  const { user: profile, isError } = useUserById(profileId || user?.id.toString());
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
                {user?.id === profile?.id && <Button>Log Out</Button>}
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

// TODO: test error if bad profileid
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
