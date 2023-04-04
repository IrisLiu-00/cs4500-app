import {
  Typography,
  Container,
  Avatar,
  styled,
  Box,
  TextField,
  Button,
  Link,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  List,
  ListItemText,
  ListItem,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useTeams } from '../hooks/useTeams';
import { API } from '../hooks/api';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Field = styled(TextField)`
  margin-bottom: 20px;
`;
const TeamItem = styled(ListItem)`
  border-bottom: rgba(0, 0, 0, 0.12) solid thin;
`;
const TeamList = styled(List)`
  border: rgba(0, 0, 0, 0.12) solid thin;
  max-height: 250px;
  overflow-y: scroll;
  margin-bottom: 15px;
  padding: 0;
`;

export const SignupPage = () => {
  const [formMode, setFormMode] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { teams } = useTeams();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const commonFields = ['email', 'password', 'roleRadio', 'username'];
    const leaderFields = ['teamName', 'teamDesc', 'teamColor'];
    const memberFields = ['selectedTeam'];
    if (
      commonFields.some((f) => !data.has(f)) ||
      leaderFields.some((f) => !data.has(f) && memberFields.some((f) => !data.has(f)))
    ) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await API.user.signup({
        email: data.get('email') as string,
        username: data.get('username') as string,
        password: data.get('password') as string,
        // @ts-expect-error need to cast to userrole
        role: data.get('roleRadio') as string,
        teamName: data.get('teamName') as string,
        teamDesc: data.get('teamDesc') as string,
        teamColor: data.get('teamColor') as string,
        selectedTeam: selectedTeam!,
      });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data);
    }
  };

  return (
    <main>
      <StyledContainer maxWidth="sm" sx={{ py: 8 }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h4" gutterBottom align="center">
          Sign up to StoryLine
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          <Field required fullWidth id="email" label="Email" name="email" type="email" />
          <Field required fullWidth id="username" label="Username" name="username" />
          <Field required fullWidth id="password" label="Password" name="password" type="password" />
          <FormLabel id="roleRadio">I want to:</FormLabel>
          <RadioGroup
            row
            aria-labelledby="roleRadio"
            name="roleRadio"
            sx={{ mb: 2 }}
            onChange={(e) => setFormMode(e.target.value)}
          >
            <FormControlLabel value="LEADER" control={<Radio />} label="Create a Team" />
            <FormControlLabel value="WRITER" control={<Radio />} label="Join a Team" />
          </RadioGroup>

          {formMode === 'LEADER' && (
            <>
              <Field required fullWidth id="teamName" label="Team Name" name="teamName" />
              <Field required fullWidth id="teamDesc" label="Team Description" name="teamDesc" />
              <Field required fullWidth id="teamColor" name="teamColor" label="Color" helperText="Enter a hex value" />
            </>
          )}
          {formMode === 'WRITER' && (
            <TeamList>
              {teams?.map((t) => (
                <TeamItem key={t.id} selected={t.id === selectedTeam} onClick={() => setSelectedTeam(t.id)}>
                  <ListItemText primary={t.id} secondary={t.description} />
                </TeamItem>
              ))}
            </TeamList>
          )}

          {error && (
            <Typography variant="caption" color="error.main" gutterBottom>
              Error: {error}
            </Typography>
          )}

          <Button type="submit" fullWidth variant="contained" sx={{ mb: 2, mt: 1 }}>
            Sign Up
          </Button>
          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Box>
      </StyledContainer>
    </main>
  );
};
