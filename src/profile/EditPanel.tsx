import { Stack, Button, Divider, styled, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserById } from '../hooks/useUser';

const ProfileField = styled(TextField)`
  margin-bottom: 25px;
`;
const StyledDivider = styled(Divider)`
  margin-bottom: 10px;
  margin-top: 40px;
`;

export const EditPanel = () => {
  const { profileId } = useParams();
  const { user } = useUserById(profileId !== undefined ? parseInt(profileId) : undefined);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  useEffect(() => {
    setDisplayName(user?.displayName || '');
    setEmail(user?.email || '');
    setPassword(user?.password || '');
  }, [user]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLTextAreaElement>, setter: React.SetStateAction<any>) => {
    setter(e.target.value);
    setHasChanges(true);
  };

  const handleSave = () => {
    // TODO: post request, mutate profile
    setHasChanges(false);
  };

  // TODO: error checking on the request
  return (
    <Stack>
      <StyledDivider />
      <Typography variant="caption" sx={{ mb: 2 }}>
        Edit personal profile
      </Typography>
      <ProfileField
        label="Username"
        variant="outlined"
        value={displayName}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFieldChange(e, setDisplayName)}
      />
      <ProfileField
        label="Email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFieldChange(e, setEmail)}
      />
      <ProfileField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFieldChange(e, setPassword)}
      />
      <Button variant="contained" disabled={!hasChanges} onClick={handleSave}>
        Save
      </Button>
    </Stack>
  );
};
