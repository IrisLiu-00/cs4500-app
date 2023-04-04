import { Typography, Container, Avatar, styled, Box, TextField, Button, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../hooks/api';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Field = styled(TextField)`
  margin-bottom: 20px;
`;

export const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.has('username') || !data.has('password')) {
      setError('Please fill in all fields');
    }
    try {
      await API.user.login({
        username: data.get('username') as string,
        password: data.get('password') as string,
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
          Sign in to StoryLine
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          <Field required fullWidth id="username" label="Username" name="username" type="username" />
          <Field required fullWidth id="password" label="Password" name="password" type="password" />

          {error && (
            <Typography variant="caption" color="error.main" gutterBottom>
              Error: {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mb: 2, mt: 1 }}>
            Log In
          </Button>

          <Link href="/signup" variant="body2">
            Don't have an account? Sign up
          </Link>
        </Box>
      </StyledContainer>
    </main>
  );
};
