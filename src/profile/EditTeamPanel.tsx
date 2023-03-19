import { Stack, Button, styled, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTeam } from '../hooks/useTeams';
import { useUserById } from '../hooks/useUser';
import { ColorSwatch } from './Styled';

const DescriptionField = styled(TextField)`
  margin-bottom: 25px;
  width: 100%;
`;
const ColorField = styled(TextField)`
  flex-grow: 2;
  @media (max-width: 900px) {
    margin-bottom: 25px;
    width: 100%;
  }
`;
const SaveButton = styled(Button)`
  flex-grow: 1;
  margin-left: 15px;
  @media (max-width: 900px) {
    margin: 0;
    width: 100%;
  }
`;

export const EditTeamPanel = () => {
  const { profileId } = useParams();
  const { user: profile } = useUserById(profileId);
  const team = useTeam(profile?.teamId);
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  useEffect(() => {
    setDescription(team?.description || '');
    setColor(team?.color || '');
  }, [team]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLTextAreaElement>, setter: React.SetStateAction<any>) => {
    setter(e.target.value);
    setHasChanges(true);
  };

  const handleSave = () => {
    // TODO: post request, mutate team
    setHasChanges(false);
  };

  // TODO: error checking on the request
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        About this team:
      </Typography>
      <DescriptionField
        label="Description"
        variant="outlined"
        value={description}
        helperText="Enter a short blurb to introduce your team"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFieldChange(e, setDescription)}
      />
      <Stack flexDirection="row" justifyContent="space-between" alignItems="baseline" flexWrap="wrap">
        <ColorField
          label="Color"
          variant="outlined"
          value={color}
          helperText="Enter a hex value"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFieldChange(e, setColor)}
        />
        <SaveButton variant="contained" disabled={!hasChanges} onClick={handleSave}>
          Save
        </SaveButton>
      </Stack>

      <ColorSwatch style={{ backgroundColor: team?.color }} />
    </Box>
  );
};
