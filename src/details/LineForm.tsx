import { Button, ListItem, styled, TextField, Tooltip, Typography, Link } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../hooks/api';
import { useStoryDetail } from '../hooks/useStoryDetail';
import { useUser } from '../hooks/useUser';

const Item = styled(ListItem)`
  flex-direction: column;
  align-items: flex-start;
`;
const FormContainer = styled('div')`
  width: 100%;
  margin-bottom: 10px;
`;
const LineField = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`;

export const LineForm = () => {
  const { user } = useUser();
  const disabled = !(user?.role === 'WRITER');
  return (
    <Item>
      <Typography gutterBottom variant="caption">
        Drop a Line to keep the story going!
      </Typography>
      {disabled ? (
        <Tooltip title="Log in as a writer to add a Line" followCursor>
          <FormContainer>
            <FormFields disabled={disabled} />
          </FormContainer>
        </Tooltip>
      ) : (
        <FormFields disabled={disabled} />
      )}
      {!user && (
        <Typography>
          <Link href="/login" underline="hover">
            Log in
          </Link>{' '}
          to post a Line!
        </Typography>
      )}
    </Item>
  );
};

const FormFields = ({ disabled }: { disabled: boolean }) => {
  const { storyId } = useParams();
  const { mutate } = useStoryDetail(Number(storyId));
  const [newLine, setNewLine] = useState('');
  const tooLong = newLine.length > 140;

  const handlePostLine = async () => {
    await API.story.postLine(Number(storyId), newLine);
    setNewLine('');
    mutate();
  };

  return (
    <FormContainer>
      <LineField
        multiline
        error={tooLong}
        helperText={`${newLine.length}/140 characters`}
        disabled={disabled}
        placeholder="It was a dark and stormy night..."
        value={newLine}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewLine(e.target.value)}
      />
      <Button variant="contained" disabled={disabled || tooLong} onClick={handlePostLine}>
        Post
      </Button>
    </FormContainer>
  );
};
