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
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';

const ShopOwnerSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerContact: '',
    ownerEmail: '',
    confirmEmail: '',
    ownerPassword: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    
    // Validate name
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Name is required';
    }
    
    // Validate contact
    if (!formData.ownerContact) {
      newErrors.ownerContact = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.ownerContact)) {
      newErrors.ownerContact = 'Please enter a valid 10-digit contact number';
    }
    
    // Validate email
    if (!formData.ownerEmail) {
      newErrors.ownerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.ownerEmail)) {
      newErrors.ownerEmail = 'Please enter a valid email address';
    }
    
    // Validate confirm email
    if (formData.ownerEmail !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Emails do not match';
    }
    
    // Validate password
    if (!formData.ownerPassword) {
      newErrors.ownerPassword = 'Password is required';
    } else if (formData.ownerPassword.length < 8) {
      newErrors.ownerPassword = 'Password must be at least 8 characters';
    }
    
    // Validate confirm password
    if (formData.ownerPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const { confirmEmail, confirmPassword, ...submitData } = formData;
      
      console.log('Request Data:', submitData);
      
      const response = await fetch('http://localhost:2025/ownerSignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submitData)
      });
      
      console.log('Response status:', response.status);
      
      const responseText = await response.text();
      console.log('Response body:', responseText);
      
      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Registration successful! Please check your email to verify your account.',
          severity: 'success'
        });
        
        // Redirect to login after a delay
        setTimeout(() => {
          navigate('/owner/login');
        }, 3000);
      } else {
        const errorMsg = responseText || `Server error: ${response.status}`;
        setSnackbar({
          open: true,
          message: `Registration failed: ${errorMsg}`,
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Detailed error:', error);
      setSnackbar({
        open: true,
        message: `Registration failed: ${error.message}`,
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const navigateToLogin = () => {
    navigate('/owner/login');
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          SHOP OWNER REGISTRATION
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="ownerName"
                name="ownerName"
                label="Full Name"
                value={formData.ownerName}
                onChange={handleChange}
                error={!!errors.ownerName}
                helperText={errors.ownerName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="ownerContact"
                name="ownerContact"
                label="Contact Number"
                type="tel"
                value={formData.ownerContact}
                onChange={handleChange}
                error={!!errors.ownerContact}
                helperText={errors.ownerContact}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="ownerEmail"
                name="ownerEmail"
                label="Email Address"
                type="email"
                value={formData.ownerEmail}
                onChange={handleChange}
                error={!!errors.ownerEmail}
                helperText={errors.ownerEmail}
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
                id="confirmEmail"
                name="confirmEmail"
                label="Confirm Email Address"
                type="email"
                value={formData.confirmEmail}
                onChange={handleChange}
                error={!!errors.confirmEmail}
                helperText={errors.confirmEmail}
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
                id="ownerPassword"
                name="ownerPassword"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.ownerPassword}
                onChange={handleChange}
                error={!!errors.ownerPassword}
                helperText={errors.ownerPassword}
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
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Register
            </Button>
            
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={navigateToLogin}
            >
              Already have an account?
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

export default ShopOwnerSignup;