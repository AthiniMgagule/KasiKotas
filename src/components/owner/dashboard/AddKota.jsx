import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  InputAdornment,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  FormGroup
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import FastfoodIcon from '@mui/icons-material/Fastfood';

const AddKota = () => {
  const navigate = useNavigate();
  const { kotaId } = useParams();
  const isEditMode = Boolean(kotaId);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [ownerId, setOwnerId] = useState(null);
  
  const [formData, setFormData] = useState({
    kotaName: '',
    chips: true,
    russians: false,
    viennas: false,
    polony: false,
    cheese: false,
    lettuce: false,
    cucumber: false,
    eggs: false,
    toasted: true,
    price: ''
  });

  useEffect(() => {
    // Get owner ID from localStorage
    const ownerData = JSON.parse(localStorage.getItem('kasikotas_owner'));
    const ownerIdValue = ownerData?.id || ownerData?.ownerId;
    setOwnerId(ownerIdValue);
    
    if (!ownerIdValue) {
      setAlert({
        open: true,
        message: 'Owner information not found. Please log in again.',
        severity: 'error'
      });
      setTimeout(() => navigate('/owner/login'), 2000);
      return;
    }

    // If editing, fetch kota data
    if (isEditMode) {
      const fetchKotaData = async () => {
        try {
          const response = await fetch(`https://kasikotas-api.onrender.com/kotaContents/${kotaId}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch kota details');
          }
          
          const data = await response.json();
          console.log("current data needed: ", data);
          
          // Verify this kota belongs to the current owner
          if (data.owner_id !== ownerIdValue) {
            setAlert({
              open: true,
              message: 'You are not authorized to edit this menu item',
              severity: 'error'
            });
            setTimeout(() => navigate('/owner/dashboard/menu'), 2000);
            return;
          }
          
          setFormData({
            kota_name: data.kota_name || '',
            chips: Boolean(data.chips),
            russians: Boolean(data.russians),
            viennas: Boolean(data.viennas),
            polony: Boolean(data.polony),
            cheese: Boolean(data.cheese),
            lettuce: Boolean(data.lettuce),
            cucumber: Boolean(data.cucumber),
            eggs: Boolean(data.eggs),
            toasted: Boolean(data.toasted),
            price: data.price.toString() || ''
          });
          
          setLoading(false);
        } catch (error) {
          console.error('Error fetching kota:', error);
          setAlert({
            open: true,
            message: 'Failed to load menu item details',
            severity: 'error'
          });
          setLoading(false);
        }
      };
      
      fetchKotaData();
    }
  }, [isEditMode, kotaId, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setFormData({
        ...formData,
        price: value
      });
    }
  };

  const validateForm = () => {
    if (!formData.kotaName.trim()) {
      setAlert({
        open: true,
        message: 'Please enter a name for your Kota',
        severity: 'error'
      });
      return false;
    }
    
    if (!formData.price) {
      setAlert({
        open: true,
        message: 'Please enter a price',
        severity: 'error'
      });
      return false;
    }
    
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      setAlert({
        open: true,
        message: 'Please enter a valid price',
        severity: 'error'
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSaving(true);
    
    try {
      // Convert string to boolean for database
      const kotaData = {
        ...formData,
        ownerId: ownerId,
        price: parseFloat(formData.price)
      };
      
      let response;
      
      if (isEditMode) {
        // Update existing kota
        response = await fetch(`https://kasikotas-api.onrender.com/updateKota/${kotaId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(kotaData),
        });
      } else {
        // Create new kota
        console.log(formData)
        console.log(kotaData)
        response = await fetch('https://kasikotas-api.onrender.com/createKota', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(kotaData),
        });
      }
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to save menu item');
      }
      
      setAlert({
        open: true,
        message: isEditMode ? 'Kota updated successfully!' : 'New Kota added to your menu!',
        severity: 'success'
      });
      
      // Navigate after a short delay
      setTimeout(() => {
        navigate('/owner/dashboard/menu');
      }, 1500);
      
    } catch (error) {
      console.error('Error saving kota:', error);
      setAlert({
        open: true,
        message: `Failed to save: ${error.message}`,
        severity: 'error'
      });
      setSaving(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton 
          component={Link} 
          to="/owner/dashboard/menu"
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">
          {isEditMode ? 'Edit Kota' : 'Add New Kota'}
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="kotaName"
                label="Kota Name"
                value={formData.kotaName}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                placeholder="e.g. Classic Kota, Deluxe Kota"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FastfoodIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Ingredients
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.chips}
                          onChange={handleInputChange}
                          name="chips"
                          color="primary"
                        />
                      }
                      label="Chips"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.russians}
                          onChange={handleInputChange}
                          name="russians"
                          color="primary"
                        />
                      }
                      label="Russian Sausage"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.viennas}
                          onChange={handleInputChange}
                          name="viennas"
                          color="primary"
                        />
                      }
                      label="Vienna Sausage"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.polony}
                          onChange={handleInputChange}
                          name="polony"
                          color="primary"
                        />
                      }
                      label="Polony"
                    />
                  </FormGroup>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.cheese}
                          onChange={handleInputChange}
                          name="cheese"
                          color="primary"
                        />
                      }
                      label="Cheese"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.lettuce}
                          onChange={handleInputChange}
                          name="lettuce"
                          color="primary"
                        />
                      }
                      label="Lettuce"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.cucumber}
                          onChange={handleInputChange}
                          name="cucumber"
                          color="primary"
                        />
                      }
                      label="Cucumber"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.eggs}
                          onChange={handleInputChange}
                          name="eggs"
                          color="primary"
                        />
                      }
                      label="Eggs"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.toasted}
                    onChange={handleInputChange}
                    name="toasted"
                    color="primary"
                  />
                }
                label="Toasted"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="price"
                label="Price (R)"
                value={formData.price}
                onChange={handlePriceChange}
                fullWidth
                required
                variant="outlined"
                type="text"
                InputProps={{
                  startAdornment: <InputAdornment position="start">R</InputAdornment>,
                }}
                helperText="Enter the price in Rands"
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                disabled={saving}
                sx={{ mr: 2 }}
              >
                {saving ? 'Saving...' : isEditMode ? 'Update Kota' : 'Add Kota'}
              </Button>
              <Button
                component={Link}
                to="/owner/dashboard/menu"
                variant="outlined"
                size="large"
                disabled={saving}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar 
        open={alert.open} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alert.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddKota;