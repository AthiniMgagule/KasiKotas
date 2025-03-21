import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const API_BASE_URL = 'https://kasikotas-api.onrender.com/'; // Update with your actual API URL

const DashboardHome = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalKotas: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    unreadNotifications: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentKotas, setRecentKotas] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const ownerData = JSON.parse(localStorage.getItem('kasikotas_owner'));
        
        // Make sure we have the owner ID
        let ownerId = ownerData?.id; // Use optional chaining to handle undefined

        if (!ownerId) {
          // Fetch owner data using email
          const email = ownerData?.email;
          if (!email) throw new Error('Owner email not found');

          const ownerResponse = await fetch(`${API_BASE_URL}/users/${email}`);
          if (!ownerResponse.ok) throw new Error('Failed to fetch owner data');

          const ownerInfo = await ownerResponse.json();
          ownerId = ownerInfo.id;
          if (!ownerId) throw new Error('Owner ID not found');

          // Store ownerId in localStorage for future use
          localStorage.setItem('kasikotas_owner', JSON.stringify({ ...ownerData, id: ownerId }));
        }

        // Convert ownerId to number for accurate comparison
        const ownerIdNum = Number(ownerId);

        // Fetch kotas
        const kotasResponse = await fetch(`${API_BASE_URL}/kotaContents`);
        if (!kotasResponse.ok) throw new Error('Failed to fetch kota data');
        
        const kotasData = await kotasResponse.json();
        // Ensure consistent property access by checking if it's ownerId or owner_id
        const ownerKotas = kotasData.filter(kota => 
          Number(kota.ownerId) === ownerIdNum || Number(kota.owner_id) === ownerIdNum
        );

        // Fetch orders
        const ordersResponse = await fetch(`${API_BASE_URL}/ownerOrders/${ownerId}`);
        let ordersData = [];
        if (ordersResponse.ok) {
          ordersData = await ordersResponse.json();
        }

        // Fetch notifications
        const notificationsResponse = await fetch(`${API_BASE_URL}/ownerNotifications/${ownerId}`);
        let notificationsData = [];
        if (notificationsResponse.ok) {
          notificationsData = await notificationsResponse.json();
        }
        
        const unreadNotifications = notificationsData.filter(notif => !notif.is_read).length;

        // Set stats
        setStats({
          totalKotas: ownerKotas.length,
          totalOrders: ordersData.length,
          pendingOrders: ordersData.filter(order => order.orderStatus === 'pending').length,
          completedOrders: ordersData.filter(order => order.orderStatus === 'delivered').length,
          unreadNotifications: unreadNotifications,
        });

        // Set recent orders and kotas
        setRecentOrders(ordersData.slice(0, 5)); // Get latest 5 orders
        setRecentKotas(ownerKotas.slice(0, 3)); // Get latest 3 kotas

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Welcome to your Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e3f2fd', height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <RestaurantMenuIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Menu Items
                </Typography>
              </Box>
              <Typography variant="h3" component="div" fontWeight="bold">
                {stats.totalKotas}
              </Typography>
              <Button 
                component={Link} 
                to="/owner/dashboard/menu"
                size="small" 
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 1 }}
              >
                Manage Menu
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff8e1', height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <ShoppingBasketIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Pending Orders
                </Typography>
              </Box>
              <Typography variant="h3" component="div" fontWeight="bold">
                {stats.pendingOrders}
              </Typography>
              <Button 
                component={Link} 
                to="/owner/dashboard/orders"
                size="small" 
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 1 }}
              >
                View Orders
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e8f5e9', height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <AttachMoneyIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Completed Orders
                </Typography>
              </Box>
              <Typography variant="h3" component="div" fontWeight="bold">
                {stats.completedOrders}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Total Orders: {stats.totalOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#ffebee', height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <NotificationsIcon color="error" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Notifications
                </Typography>
              </Box>
              <Typography variant="h3" component="div" fontWeight="bold">
                {stats.unreadNotifications}
              </Typography>
              <Button 
                component={Link} 
                to="/owner/dashboard/notifications"
                size="small" 
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 1 }}
              >
                View All
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Orders and Menu Items */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Recent Orders</Typography>
              <Button 
                component={Link} 
                to="/owner/dashboard/orders"
                size="small" 
                endIcon={<ArrowForwardIcon />}
              >
                See All
              </Button>
            </Box>
            <Divider />
            <List>
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <ListItem key={order.orderId || order.order_id} divider>
                    <ListItemText
                      primary={`Order #${order.orderId || order.order_id} - ${order.customerName || order.customer_name}`}
                      secondary={`Status: ${order.orderStatus || order.order_status} | Items: ${order.quantity} | Total: R${order.totalPrice || order.total_price}`}
                    />
                    <ListItemSecondaryAction>
                      <Button 
                        component={Link} 
                        to={`/owner/dashboard/orders/${order.orderId || order.order_id}`}
                        size="small"
                      >
                        Details
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No recent orders" />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Your Menu</Typography>
              <Button 
                component={Link} 
                to="/owner/dashboard/menu/add"
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />}
                size="small"
              >
                Add Kota
              </Button>
            </Box>
            <Divider />
            <List>
              {recentKotas.length > 0 ? (
                recentKotas.map((kota) => (
                  <ListItem key={kota.kotaId || kota.kota_id} divider>
                    <ListItemText
                      primary={kota.kotaName || kota.kota_name}
                      secondary={`Price: R${kota.price}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton 
                        component={Link} 
                        to={`/owner/dashboard/menu/edit/${kota.kotaId || kota.kota_id}`}
                        edge="end" 
                        aria-label="edit"
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No menu items yet" />
                </ListItem>
              )}
            </List>
            <Box mt={2} display="flex" justifyContent="center">
              <Button 
                component={Link} 
                to="/owner/dashboard/menu"
                variant="outlined" 
                color="primary"
              >
                View Full Menu
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;