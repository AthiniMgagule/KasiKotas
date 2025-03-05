import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Paper,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  IconButton,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  TextField,
  InputAdornment
} from '@mui/material';
import {
//   Search as SearchIcon,
  Restaurant as RestaurantIcon,
  LocalOffer as OffersIcon,
  Favorite as FavoritesIcon,
  Fastfood as FastfoodIcon,
  DeliveryDining as DeliveryIcon,
  LocalDining as DiningIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  Menu as MenuBarIcon
} from '@mui/icons-material';

// Import your footer component
// import UserFooter from './UserFooter';

const UsersWelcomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // For mobile menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  // For animations
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setAnimate(true);
  }, []);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const popularCategories = [
    { name: "Burgers", icon: <FastfoodIcon fontSize="large" /> },
    { name: "Pizza", icon: <DiningIcon fontSize="large" /> },
    { name: "Sushi", icon: <RestaurantIcon fontSize="large" /> },
    { name: "Indian", icon: <DiningIcon fontSize="large" /> },
    { name: "Italian", icon: <DiningIcon fontSize="large" /> },
    { name: "Chinese", icon: <RestaurantIcon fontSize="large" /> }
  ];

  const topRestaurants = [
    {
      name: "Burger Empire",
      image: "https://source.unsplash.com/random/800x600/?burger,restaurant",
      rating: 4.8,
      deliveryTime: "15-25 min",
      category: "American",
      priceLevel: "$$"
    },
    {
      name: "Pasta Paradise",
      image: "https://source.unsplash.com/random/800x600/?pasta,restaurant",
      rating: 4.7,
      deliveryTime: "20-30 min",
      category: "Italian",
      priceLevel: "$$$"
    },
    {
      name: "Sushi Sensation",
      image: "https://source.unsplash.com/random/800x600/?sushi,restaurant",
      rating: 4.9,
      deliveryTime: "25-35 min",
      category: "Japanese",
      priceLevel: "$$$"
    },
    {
      name: "Taco Fiesta",
      image: "https://source.unsplash.com/random/800x600/?taco,restaurant",
      rating: 4.5,
      deliveryTime: "15-25 min",
      category: "Mexican",
      priceLevel: "$$"
    }
  ];

  const appFeatures = [
    {
      title: "Find Local Kota Spots",
      description: "Discover the best local kota spots near you, from hidden gems to popular favorites.",
      icon: <LocationIcon fontSize="large" color="primary" />
    },
    {
      title: "Easy Ordering",
      description: "Order with just a few taps and customize your meals exactly how you like them.",
      icon: <RestaurantIcon fontSize="large" color="primary" />
    },
    {
      title: "Exclusive Deals",
      description: "Get access to special discounts and promotions only available through our app. Keep a lookout!",
      icon: <OffersIcon fontSize="large" color="primary" />
    },
    {
      title: "Fast Collection",
      description: "Track your order in real-time and enjoy quick collection.",
      icon: <DeliveryIcon fontSize="large" color="primary" />
    },
    {
      title: "Save Favorites",
      description: "Keep track of your favorite dishes and kota spots for quick reordering.",
      icon: <FavoritesIcon fontSize="large" color="primary" />
    },
    {
      title: "Order Scheduling",
      description: "Plan ahead by scheduling orders for later in the day or week.",
      icon: <ScheduleIcon fontSize="large" color="primary" />
    },
    {
      title: "Feedback",
      description: "Offer anonymous feedback to the restuarants that serve you in order to improve their services.",
      con: <ScheduleIcon fontSize="large" color="primary" />
    }
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      {/* Navigation Bar */}
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: 'flex',
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
                flexGrow: isMobile ? 1 : 0
              }}
            >
              Kasi Kotas
            </Typography>

            {isMobile ? (
              <>
                <IconButton
                  size="large"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuBarIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
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
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} component={RouterLink} to="#">Restaurants</MenuItem>
                  <MenuItem onClick={handleClose} component={RouterLink} to="#">Deals</MenuItem>
                  <MenuItem onClick={handleClose} component={RouterLink} to="#">My Orders</MenuItem>
                  <MenuItem onClick={handleClose} component={RouterLink} to="#">Help</MenuItem>
                  <MenuItem onClick={handleClose} component={RouterLink} to="/owner/welcomepage">Are you a shop owner?</MenuItem>
                  <Divider />
                  {/* <MenuItem onClick={handleClose} component={RouterLink} to="/login">Log in</MenuItem>
                  <MenuItem onClick={handleClose} component={RouterLink} to="/signup">Sign up</MenuItem> */}
                </Menu>
              </>
            ) : (
              <>
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                  <Button color="inherit" component={RouterLink} to="/restaurants">
                    Restaurants
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/deals">
                    Deals
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/my-orders">
                    My Orders
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/help">
                    Help
                  </Button>
                  <Button color="inherit" component={RouterLink} to="../owner/OwnersWelcomePage">
                    Are you a shop owner?
                  </Button>
                </Box>

                {/* <Box>
                  <Button color="inherit" component={RouterLink} to="/login">
                    Log in
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    component={RouterLink} 
                    to="/signup"
                    sx={{ ml: 2 }}
                  >
                    Sign up
                  </Button>
                </Box> */}
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://source.unsplash.com/random/1600x900/?food,restaurant")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 12,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Fade in={animate} timeout={1000}>
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 3
              }}
            >
              Discover & Order Amazing Kotas
            </Typography>
          </Fade>
          
          <Fade in={animate} timeout={1500}>
            <Typography
              variant="h5"
              paragraph
              sx={{ mb: 4, opacity: 0.9 }}
            >
              Find the best kota spots in your area and get your favorite meals made while in your home and enjoy quick collection and/or delivery.
            </Typography>
          </Fade>
          
          <Fade in={animate} timeout={2000}>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                mx: 'auto',
                maxWidth: 600,
                gap: 2,
                mt: 3
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon sx={{ color: 'white' }} />
                    </InputAdornment>
                  ),
                  sx: { 
                    bgcolor: 'rgba(255, 255, 255, 0.15)', 
                    borderRadius: 1,
                    '& input': { color: 'white' },
                    '& fieldset': { borderColor: 'transparent' }
                  }
                }}
              />
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                sx={{ 
                  py: 1.5, 
                  px: { xs: 3, sm: 5 }, 
                  fontSize: '1.1rem',
                  whiteSpace: 'nowrap'
                }}
              >
                Find Kota
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Popular Categories */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Slide direction="up" in={animate} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" gutterBottom>
              Popular Categories
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Browse your favorite food categories to find the perfect meal
            </Typography>
          </Box>
        </Slide>

        <Grid container spacing={3} justifyContent="center">
          {popularCategories.map((category, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Fade in={animate} timeout={1000 + (index * 200)}>
                <Paper
                  elevation={1}
                  component={RouterLink}
                  to={`/category/${category.name.toLowerCase()}`}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 2,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    textDecoration: 'none',
                    color: 'text.primary',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3,
                      bgcolor: 'primary.light',
                      color: 'white',
                      '& .MuiSvgIcon-root': {
                        color: 'white'
                      }
                    }
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 1 }}>
                    {category.icon}
                  </Box>
                  <Typography variant="h6">
                    {category.name}
                  </Typography>
                </Paper>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Restaurants */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Slide direction="up" in={animate} timeout={1000}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
              <Box>
                <Typography variant="h3" gutterBottom>
                  Top Kota Spots
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Discover the highest-rated places loved by our customers
                </Typography>
              </Box>
              <Button 
                component={RouterLink}
                to="/restaurants"
                variant="outlined" 
                color="primary"
                sx={{ display: { xs: 'none', md: 'block' } }}
              >
                View All
              </Button>
            </Box>
          </Slide>

          <Grid container spacing={3}>
            {topRestaurants.map((restaurant, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Fade in={animate} timeout={1000 + (index * 200)}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      borderRadius: 2,
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 3
                      }
                    }}
                    component={RouterLink}
                    to={`/restaurant/${restaurant.name.toLowerCase().replace(/\s+/g, '-')}`}
                    // sx={{
                    //   textDecoration: 'none',
                    //   color: 'inherit'
                    // }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={restaurant.image}
                      alt={restaurant.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {restaurant.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <StarIcon sx={{ color: '#FFD700', mr: 0.5, fontSize: '1rem' }} />
                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                          {restaurant.rating}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          • {restaurant.category} • {restaurant.priceLevel}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {restaurant.deliveryTime} delivery
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 4, display: { xs: 'block', md: 'none' } }}>
            <Button 
              component={RouterLink}
              to="/restaurants"
              variant="outlined" 
              color="primary"
            >
              View All Kota Spots
            </Button>
          </Box>
        </Container>
      </Box>

      {/* How It Works */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Slide direction="up" in={animate} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" gutterBottom>
              How It Works
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Ordering your favorite kota is simple and quick
            </Typography>
          </Box>
        </Slide>

        <Grid container spacing={3} justifyContent="center">
          {[
            {
              icon: <LocationIcon fontSize="large" color="primary" />,
              title: "Set Your Location",
              description: "Enter your address to find kota spots that are near you"
            },
            {
              icon: <RestaurantIcon fontSize="large" color="primary" />,
              title: "Choose a Kota spot",
              description: "Browse menus and reviews to find your perfect kota"
            },
            {
              icon: <FastfoodIcon fontSize="large" color="primary" />,
              title: "Place Your Order",
              description: "Customize your meal and add it to your cart"
            },
            {
              icon: <DeliveryIcon fontSize="large" color="primary" />,
              title: "Enjoy Your Food",
              description: "Track your order and enjoy your meal when it is done"
            }
          ].map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Fade in={animate} timeout={1000 + (index * 200)}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Box sx={{ 
                    bgcolor: 'background.paper', 
                    p: 2, 
                    borderRadius: '50%', 
                    width: 80, 
                    height: 80, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    boxShadow: 1,
                    mb: 2,
                    mx: 'auto'
                  }}>
                    {step.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* App Features */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Slide direction="up" in={animate} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h3" gutterBottom>
                Why Choose Kasi Kotas
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                Enjoy a seamless kota ordering experience with our user-friendly features
              </Typography>
            </Box>
          </Slide>

          <Grid container spacing={4}>
            {appFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Fade in={animate} timeout={1000 + (index * 200)}>
                  <Card 
                    elevation={0} 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      borderRadius: 2,
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                      <Box sx={{ mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography gutterBottom variant="h5" component="h2">
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Special Offers */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Slide direction="up" in={animate} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" gutterBottom>
              Special Offers
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Exclusive deals and discounts just for you
            </Typography>
          </Box>
        </Slide>

        <Grid container spacing={3}>
          {[
            {
              title: "30% OFF YOUR FIRST ORDER (Placeholder)",
              code: "WELCOME30",
              description: "Use code at checkout to get 30% off your first order up to $15",
              bgColor: '#4CAF50',
              expiry: "Valid for new users only"
            },
            {
              title: "FREE DELIVERY THIS WEEKEND (Placeholder)",
              code: "FREEWEEKEND",
              description: "Get free delivery on all orders over $20 this weekend",
              bgColor: '#2196F3',
              expiry: "Valid Saturday & Sunday only"
            }
          ].map((offer, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Fade in={animate} timeout={1000 + (index * 300)}>
                <Paper
                  sx={{
                    bgcolor: offer.bgColor,
                    color: 'white',
                    p: 4,
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                      {offer.title}
                    </Typography>
                    <Box sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.2)', 
                      display: 'inline-block', 
                      px: 2, 
                      py: 1, 
                      borderRadius: 1,
                      mb: 2
                    }}>
                      <Typography variant="h6" component="span">
                        {offer.code}
                      </Typography>
                    </Box>
                    <Typography variant="body1" paragraph>
                      {offer.description}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {offer.expiry}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      right: -20,
                      width: 140,
                      height: 140,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      zIndex: 0
                    }}
                  />
                </Paper>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 8, 
          textAlign: 'center' 
        }}
      >
        <Container maxWidth="md">
          <Fade in={animate} timeout={1000}>
            <Typography variant="h3" gutterBottom>
              Ready to Order?
            </Typography>
          </Fade>
          <Fade in={animate} timeout={1500}>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of food lovers already enjoying quick and easy ordering with Kasi Kotas.
            </Typography>
          </Fade>
          <Fade in={animate} timeout={2000}>
            <Button
              component={RouterLink}
              to="/signup"
              variant="contained"
              color="secondary"
              size="large"
              sx={{ 
                py: 1.5, 
                px: 5, 
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              Sign Up Now
            </Button>
          </Fade>
          <Fade in={animate} timeout={2500}>
            <Typography variant="body2" sx={{ mt: 2, opacity: 0.7 }}>
              No subscription fees • Free to use
            </Typography>
          </Fade>
        </Container>
      </Box>

      {/* Mobile App Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Slide direction="right" in={animate} timeout={1000}>
              <Box>
                <Typography variant="h3" gutterBottom>
                  Download Our Mobile App
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                  Get the full FoodHub experience on your mobile device. Order food, track deliveries, and receive exclusive app-only offers.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      bgcolor: '#000', 
                      '&:hover': { bgcolor: '#333' },
                      px: 3
                    }}
                  >
                    App Store
                  </Button>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      bgcolor: '#000', 
                      '&:hover': { bgcolor: '#333' },
                      px: 3
                    }}
                  >
                    Google Play
                  </Button>
                </Stack>
              </Box>
            </Slide>
          </Grid>
          <Grid item xs={12} md={6}>
            <Slide direction="left" in={animate} timeout={1000}>
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                p: 3
              }}>
                <Box 
                  component="img"
                  src="https://source.unsplash.com/random/600x900/?smartphone,app"
                  alt="FoodHub Mobile App"
                  sx={{
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: 400,
                    borderRadius: 3,
                    boxShadow: 3
                  }}
                />
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      {/* <UserFooter /> */}
      {/* Uncomment the above line and import your footer component to include it */}
    </Box>
  );
};

export default UsersWelcomePage;