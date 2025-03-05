import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  IconButton, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Avatar,
  Menu,
  MenuItem,
  Badge,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Import dashboard pages (we'll create these components next)
// import DashboardHome from './dashboard/DashboardHome';
// import MenuManagement from './dashboard/MenuManagement';
// import OrderManagement from './dashboard/OrderManagement';
// import Notifications from './dashboard/Notifications';
// import FeedbackReview from './dashboard/FeedbackReview';
// import Settings from './dashboard/Settings';
// import AddKota from './dashboard/AddKota';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.primary.main,
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const ShopOwnerDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [owner, setOwner] = useState(null);
  
  useEffect(() => {
    // Check if user is logged in
    const storedOwner = localStorage.getItem('kasikotas_owner');
    if (!storedOwner) {
      navigate('/owner/login');
      return;
    }
    
    setOwner(JSON.parse(storedOwner));
    
    // Fetch notification count
    // This would be replaced with actual API call
    setNotificationCount(3);
  }, [navigate]);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('kasikotas_token');
    localStorage.removeItem('kasikotas_owner');
    navigate('/owner/login');
  };
  
  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/owner/dashboard' },
    { text: 'Menu Management', icon: <RestaurantMenuIcon />, path: '/owner/dashboard/menu' },
    { text: 'Order Management', icon: <ShoppingBasketIcon />, path: '/owner/dashboard/orders' },
    { 
      text: 'Notifications', 
      icon: <Badge badgeContent={notificationCount} color="error"><NotificationsIcon /></Badge>, 
      path: '/owner/dashboard/notifications' 
    },
    { text: 'Feedback & Reviews', icon: <FeedbackIcon />, path: '/owner/dashboard/feedback' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/owner/dashboard/settings' },
  ];

  if (!owner) {
    return null; // Or a loading spinner
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Kasi Kotas - Owner Dashboard
          </Typography>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
              {owner.name ? owner.name.charAt(0).toUpperCase() : 'O'}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </StyledAppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
            <Avatar 
              alt="Kasi Kotas Logo" 
              src="/logo.png" 
              sx={{ width: 40, height: 40, mr: 1 }} 
            />
            <Typography variant="h6" color="primary">
              Kasi Kotas
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
       {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.path} onClick={() => isMobile && handleDrawerClose()}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* <Routes>
          <Route path="/owner/dashboard" element={<DashboardHome />} />
          <Route path="/owner/dashboard/menu" element={<MenuManagement />} />
          <Route path="/owner/dashboard/orders" element={<OrderManagement />} />
          <Route path="/owner/dashboard/notifications" element={<Notifications />} />
          <Route path="/owner/dashboard/feedback" element={<FeedbackReview />} />
          <Route path="/owner/dashboard/settings" element={<Settings />} />
          <Route path="/owner/dashboard/menu/add" element={<AddKota />} />
        </Routes> */}
      </Main>
    </Box>
  );
};

export default ShopOwnerDashboard;