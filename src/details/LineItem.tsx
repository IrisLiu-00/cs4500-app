import { styled, ListItem, Box, Button, Typography, Stack, Popover, Divider } from '@mui/material';
import { useState } from 'react';
import { useTeam } from '../hooks/useTeams';
import { useUser } from '../hooks/useUser';
import { Line } from '../types';

const Item = styled(ListItem)`
  flex-direction: column;
  align-items: flex-start;
`;
const LineDetails = styled(Box)`
  text-align: right;
  font-size: 0.95em;
  flex-grow: 1;
`;
const ProfileLink = styled(Button)`
  padding: 0px 8px;
  text-transform: none;
  :hover {
    background: none;
  }
`;
const PopupButtons = styled(Stack)`
  width: unset;
`;

export const LineItem = ({ line }: { line: Line }) => {
  const { user } = useUser();
  const team = useTeam(line.user.teamId);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const handleDeleteLine = () => {
    // TODO: call api to delete, mutate lines for story
    setAnchorEl(null);
  };

  return (
    <>
      <Item>
        <Typography variant="body1" gutterBottom>
          {line.text}
        </Typography>
        <Stack direction="row" justifyContent="space-between" width="100%">
          {user?.role === 'LEADER' && (
            <Button variant="outlined" color="error" size="small" onClick={handleOpenPopover}>
              Remove
            </Button>
          )}
          <LineDetails>
            <ProfileLink href={`/profile/${line.user.id}`} sx={{ color: team?.color }}>
              {line.user.displayName}
            </ProfileLink>
            - {line.timestamp.toLocaleDateString()}
          </LineDetails>
        </Stack>
        <Popover
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography gutterBottom>Delete this Line for inappropriate content?</Typography>
            <PopupButtons direction="row" justifyContent="flex-end" width="100%">
              <Button size="small" onClick={handleDeleteLine}>
                Yes
              </Button>
              <Button size="small" onClick={handleClosePopover}>
                No
              </Button>
            </PopupButtons>
          </Box>
        </Popover>
      </Item>
      <Divider />
    </>
  );
};
