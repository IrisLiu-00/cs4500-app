import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { AccountCircle, LibraryBooks, Search } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Input, InputAdornment, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;
const StyledTitle = styled(Typography)`
  color: inherit;
  text-decoration: none;
  display: flex;
`;
const StyledSearch = styled(Input)`
  border-radius: 15px;
  background-color: #ffffff40;
  padding-left: 10px;
  color: inherit;
  width: 50%;
  &::placeholder {
    color: white;
  }

  :hover {
    background-color: #ffffff45;
  }
  ::before,
  ::after {
    display: none;
  }
`;
const StyledAdornment = styled(InputAdornment)`
  color: inherit;
`;

function Nav() {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState('');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchString('');
      navigate({
        pathname: '/search',
        search: `?${createSearchParams({
          criteria: searchString,
        })}`,
      });
    }
  };

  return (
    <AppBar position="static">
      <StyledToolbar>
        <StyledTitle variant="h6" noWrap component="a" href="/">
          <LibraryBooks fontSize="large" sx={{ mr: 1 }} />
          {matches && 'STORYLINE'}
        </StyledTitle>
        <StyledSearch
          placeholder="Search stories"
          value={searchString}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleSearch(e)}
          startAdornment={
            <StyledAdornment position="start">
              <Search />
            </StyledAdornment>
          }
        />
        <Tooltip title="Profile">
          <IconButton
            size="large"
            href="/profile"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle fontSize="large" />
          </IconButton>
        </Tooltip>
      </StyledToolbar>
    </AppBar>
  );
}
export default Nav;
