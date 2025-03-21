import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Box,
  Grid,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Link
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const ShopOwnerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerEmail: '',
    ownerPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      console.log('Login Request Data:', formData); //note formData only contains data that was added on the form so the id would not be there
      
      const response = await fetch('https://kasikotas-api.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const result = await response.json();

        console.log('owner details: ', result);
        
        // Store token or user info in localStorage
        localStorage.setItem('kasikotas_token', result.token);
        localStorage.setItem('kasikotas_owner', JSON.stringify({
          id: result.id,
          name: result.name,
          email: result.email
        }));

       
        
        setSnackbar({
          open: true,
          message: 'Login successful!',
          severity: 'success'
        });
        
        // Redirect to dashboard
        navigate('/owner/dashboard');
      } else {
        const errorText = await response.text();
        setSnackbar({
          open: true,
          message: errorText || 'Login failed. Please check your credentials.',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setSnackbar({
        open: true,
        message: `Login failed: ${error.message}`,
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const navigateToSignup = () => {
    navigate('/owner/signup');
  };

  return (
    <Container maxWidth="sm" sx={{ my: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          SHOP OWNER LOGIN
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="password"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 2, mb: 2, textAlign: 'right' }}>
            <Link 
              href="#" 
              underline="hover"
              sx={{ color: 'secondary.main' }}
              onClick={(e) => {
                e.preventDefault();
                // Add forgot password functionality
              }}
            >
              Forgot password?
            </Link>
          </Box>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Login
            </Button>
            
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={navigateToSignup}
            >
              Create an account
            </Button>
          </Box>
        </Box>
      </Paper>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ShopOwnerLogin;