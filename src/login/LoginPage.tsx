import { Typography, Container, Avatar, styled, Box, TextField, Button, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Field = styled(TextField)`
  margin-bottom: 20px;
`;

export const LoginPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
          <Field required fullWidth id="email" label="Email" name="email" type="email" />
          <Field required fullWidth id="password" label="Password" name="password" type="password" />
          <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
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
