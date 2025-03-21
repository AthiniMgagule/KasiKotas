import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FastfoodIcon from '@mui/icons-material/Fastfood';

const MenuManagement = () => {
  const navigate = useNavigate();
  const [kotas, setKotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [kotaToDelete, setKotaToDelete] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [ownerId, setOwnerId] = useState(null);

  useEffect(() => {
    const fetchKotas = async () => {
      try {
        const ownerData = JSON.parse(localStorage.getItem('kasikotas_owner'));
        const ownerIdValue = ownerData?.id || ownerData?.ownerId;
        setOwnerId(ownerIdValue);
        console.log("Owner ID:", ownerIdValue);
        
        if (!ownerIdValue) {
          throw new Error('Owner ID not found');
        }
        const response = await fetch(`https://kasikotas-api.onrender.com/kotaContents`);
        const kotaData = await response.json();
        console.log("All Kota Data:", kotaData);

        // Filter kotas for this owner - handle both property naming conventions
        const ownerKotas = kotaData.filter(kota => 
          kota.owner_id === ownerIdValue || kota.ownerId === ownerIdValue
        );
        
        // Normalize the data for consistency in the UI
        const normalizedKotas = ownerKotas.map(kota => ({
          kota_id: kota.kota_id || kota.kotaId,
          kota_name: kota.kota_name || kota.kotaName,
          owner_id: kota.owner_id || kota.ownerId,
          price: kota.price || 0,
          chips: kota.chips || false,
          russians: kota.russians || false,
          viennas: kota.viennas || false,
          polony: kota.polony || false,
          cheese: kota.cheese || false,
          lettuce: kota.lettuce || false,
          cucumber: kota.cucumber || false,
          eggs: kota.eggs || false,
          toasted: kota.toasted || false
        }));
        
        setKotas(normalizedKotas);
        console.log("Filtered and normalized kota data:", normalizedKotas);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching kotas:', error);
        setAlert({
          open: true,
          message: 'Failed to load menu items',
          severity: 'error'
        });
        setLoading(false);
      }
    };

    fetchKotas();
  }, []);

  const handleDeleteClick = (kota) => {
    setKotaToDelete(kota);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!kotaToDelete) return;
    
    try {
      const response = await fetch(`https://kasikotas-api.onrender.com/deleteKota/${kotaToDelete.kota_id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setKotas(kotas.filter(k => k.kota_id !== kotaToDelete.kota_id));
        setAlert({
          open: true,
          message: `${kotaToDelete.kota_name} has been deleted`,
          severity: 'success'
        });
      } else {
        throw new Error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting kota:', error);
      setAlert({
        open: true,
        message: 'Failed to delete menu item',
        severity: 'error'
      });
    } finally {
      setDeleteDialogOpen(false);
      setKotaToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setKotaToDelete(null);
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const filteredKotas = kotas.filter(kota => 
    kota.kota_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderIngredientChips = (kota) => {
    const ingredients = [];
    
    if (kota.chips) ingredients.push('Chips');
    if (kota.russians) ingredients.push('Russians');
    if (kota.viennas) ingredients.push('Viennas');
    if (kota.polony) ingredients.push('Polony');
    if (kota.cheese) ingredients.push('Cheese');
    if (kota.lettuce) ingredients.push('Lettuce');
    if (kota.cucumber) ingredients.push('Cucumber');
    if (kota.eggs) ingredients.push('Eggs');
    
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {ingredients.map((ingredient) => (
          <Chip 
            key={ingredient} 
            label={ingredient} 
            size="small" 
            sx={{ marginRight: 0.5, marginBottom: 0.5 }}
          />
        ))}
        {kota.toasted && <Chip label="Toasted" color="warning" size="small" />}
      </Box>
    );
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Menu Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/owner/dashboard/menu/add"
        >
          Add New Kota
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        {kotas.length === 0 ? (
          <Box textAlign="center" py={4}>
            <FastfoodIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your menu is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Start by adding your first Kota to your menu
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              component={Link}
              to="/owner/dashboard/menu/add"
            >
              Add New Kota
            </Button>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="25%"><Typography variant="subtitle2">Kota Name</Typography></TableCell>
                  <TableCell width="45%"><Typography variant="subtitle2">Ingredients</Typography></TableCell>
                  <TableCell width="15%"><Typography variant="subtitle2">Price</Typography></TableCell>
                  <TableCell width="15%"><Typography variant="subtitle2">Actions</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredKotas.map((kota) => (
                  <TableRow key={kota.kota_id}>
                    <TableCell>{kota.kota_name}</TableCell>
                    <TableCell>{renderIngredientChips(kota)}</TableCell>
                    <TableCell>R{kota.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <IconButton 
                        color="primary" 
                        onClick={() => navigate(`/owner/dashboard/menu/edit/${kota.kota_id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        color="error" 
                        onClick={() => handleDeleteClick(kota)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{kotaToDelete?.kota_name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MenuManagement;