import { useIntl } from 'react-intl';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Homepage from './pages/Homepage';
import About from './pages/About';
import { theme } from './theme/theme';

function App() {
  const intl = useIntl();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav> */}

        <Routes>
          <Route exact path="/" element={<Homepage intl={intl} />} />
          <Route path="/about" element={<About intl={intl} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;
