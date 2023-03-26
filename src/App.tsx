import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './home/HomePage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { SearchPage } from './search/SearchPage';
import { DetailsPage } from './details/DetailsPage';
import { ProfilePage } from './profile/ProfilePage';
import { LoginPage } from './login/LoginPage';
import { SignupPage } from './login/SignupPage';

const theme = createTheme();

function App() {
  console.log('here');
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/details/:storyId" element={<DetailsPage />} />
          <Route path="/profile/:profileId?" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
