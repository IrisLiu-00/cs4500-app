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
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Field = styled(TextField)`
  margin-bottom: 20px;
`;

export const SignupPage = () => {
  const handleSubmit = () => {};
  // TODO: figure out if use form or controlled component for dynamic form
  return (
    <main>
      <StyledContainer maxWidth="sm" sx={{ py: 8 }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h4" gutterBottom align="center">
          Sign up to StoryLine
        </Typography>
        <Box sx={{ mt: 3, width: '100%' }}>
          <Field required fullWidth id="email" label="Email" name="email" type="email" />
          <Field required fullWidth id="username" label="Username" name="username" />
          <Field required fullWidth id="password" label="Password" name="password" type="password" />
          <FormLabel id="role-radio">I want to:</FormLabel>
          <RadioGroup row aria-labelledby="role-radio" name="role-radio" sx={{ mb: 2 }}>
            <FormControlLabel value="LEADER" control={<Radio />} label="Create a Team" />
            <FormControlLabel value="WRITER" control={<Radio />} label="Join a Team" />
          </RadioGroup>

          <Button fullWidth variant="contained" sx={{ mb: 2 }} onClick={handleSubmit}>
            Log In
          </Button>
          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Box>
      </StyledContainer>
    </main>
  );
};
