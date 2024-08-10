import { useIntl } from 'react-intl';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Homepage from './pages/Homepage';
import About from './pages/About';
import { theme } from './theme/theme';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Container } from './components/StyledDivs';

function App() {
  const intl = useIntl();
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Router>
          <Navbar intl={intl} />
          {/* <Container> */}
          <Routes>
            <Route exact path="/" element={<Homepage intl={intl} />} />
            <Route path="/about" element={<About intl={intl} />} />
            <Route path="/contact" element={<Contact intl={intl} />} />
          </Routes>
          {/* </Container> */}
          <Footer intl={intl} />
        </Router>
      </Container>
    </ThemeProvider>
  );
}
export default App;
