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

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/details/:storyId" element={<DetailsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
