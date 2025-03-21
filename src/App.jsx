import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import WelcomePage from './components/users/UsersWelcomePage';
import OwnersWelcomePage from './components/owner/OwnersWelcomePage';
import ShopOwnerSignup from './components/owner/ShopOwnerSignup';
import ShopOwnerLogin from './components/owner/ShopOwnerLogin';
import ShopOwnerDashboard from './components/owner/ShopOwnerDashboard';
import OwnersFooter from './components/owner/OwnersFooter';
import Verification from './components/Verification';


// Create a custom theme with Kasi Kotas brand colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#BE6805', // The orange color from your CSS
    },
    secondary: {
      main: '#12657A', // The blue color from your CSS
    },
    background: {
      default: '#CAFF9F', // The light green background from your CSS
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
      borderBottom: '2px solid #FFCE65',
      paddingBottom: '8px',
      marginBottom: '16px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.2), -6px -6px 12px rgba(255, 255, 255, 0.5)',
          padding: '12px 24px',
          '&:hover': {
            boxShadow: 'inset 6px 6px 12px rgba(0, 0, 0, 0.2), inset -6px -6px 12px rgba(255, 255, 255, 0.5)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/owner/welcomepage" element={<OwnersWelcomePage />} />
          <Route path="/owner/signup" element={<ShopOwnerSignup />} />
          <Route path="/owner/login" element={<ShopOwnerLogin />} />
          <Route path="/owner/dashboard/*" element={<ShopOwnerDashboard />} />
          <Route path="/owner/footer/" element={<OwnersFooter />} />
          <Route path="/owner/verify-email" element={<Verification />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
