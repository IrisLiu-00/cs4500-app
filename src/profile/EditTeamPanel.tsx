import { Stack, Button, styled, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTeam } from '../hooks/useTeams';
import { useUser } from '../hooks/useUser';
import { ColorSwatch } from './Styled';
import { API } from '../hooks/api';

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
  const { user: profile } = useUser(profileId !== undefined ? parseInt(profileId) : undefined);
  const { team, mutate } = useTeam(profile?.teamId);
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [colorError, setColorError] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  useEffect(() => {
    setDescription(team?.description || '');
    setColor(team?.color || '');
  }, [team]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLTextAreaElement>, setter: (x: any) => any) => {
    setter(e.target.value);
    setHasChanges(true);
  };

  const colorSetter = (newClr: string) => {
    setColor(newClr);
    if (!newClr.match('^#(?:[0-9a-fA-F]{3}){1,2}$')) setColorError(true);
    else setColorError(false);
  };

  const handleSave = async () => {
    if (!team) return;
    await API.team.patch(team.id, { description, color });
    mutate();
    setHasChanges(false);
  };

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
          error={colorError}
          helperText={colorError ? 'Invalid hex value' : 'Enter a hex value'}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFieldChange(e, colorSetter)}
        />
        <SaveButton variant="contained" disabled={!hasChanges || colorError} onClick={handleSave}>
          Save
        </SaveButton>
      </Stack>

      <ColorSwatch style={{ backgroundColor: team?.color }} />
    </Box>
  );
};
