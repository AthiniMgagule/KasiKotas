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
  MenuItem
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  RestaurantMenu as MenuIcon,
  TrendingUp as AnalyticsIcon,
  Smartphone as AppIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  ExpandMore as ExpandMoreIcon,
  Menu as MenuBarIcon
} from '@mui/icons-material';
import Footer from './OwnersFooter';

const OwnersWelcomePage = () => {
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

  const features = [
    {
      title: "Order Management",
      description: "Streamline your order process from receipt to collection with real-time updates.",
      icon: <DashboardIcon fontSize="large" color="primary" />
    },
    {
      title: "Menu Builder",
      description: "Create and update your menu effortlessly with our drag-and-drop editor.",
      icon: <MenuIcon fontSize="large" color="primary" />
    },
    {
      title: "Analytics & Reporting",
      description: "Gain insights with comprehensive reports on sales, popular items, and peak hours.",
      icon: <AnalyticsIcon fontSize="large" color="primary" />
    },
    {
      title: "Mobile App ( Coming Soon )",
      description: "Manage your kota store on the go with our fully-featured mobile application.",
      icon: <AppIcon fontSize="large" color="primary" />
    },
    {
      title: "Secure Platform",
      description: "Rest easy with end-to-end encryption and secure payment processing.",
      icon: <SecurityIcon fontSize="large" color="primary" />
    },
    {
      title: "24/7 Support",
      description: "Our dedicated support team is always ready to assist with any questions.",
      icon: <SupportIcon fontSize="large" color="primary" />
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
                  <MenuItem onClick={handleClose} component={RouterLink} to="/features">Features</MenuItem>
                  <MenuItem onClick={handleClose} component={RouterLink} to="/pricing">Pricing</MenuItem>
                  <MenuItem onClick={handleClose} component={RouterLink} to="/testimonials">Testimonials</MenuItem>
                  <MenuItem onClick={handleClose} component={RouterLink} to="/contact">Contact</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose} component={RouterLink} to="/owner/login">Log in</MenuItem>
                  <MenuItem onClick={handleClose} component={RouterLink} to="/owner/signup">Sign up</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                  <Button color="inherit" component={RouterLink} to="/features">
                    Features
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/pricing">
                    Pricing
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/testimonials">
                    Testimonials
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/contact">
                    Contact
                  </Button>
                </Box>

                <Box>
                  <Button color="inherit" component={RouterLink} to="/owner/login">
                    Log in
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    component={RouterLink} 
                    to="/owner/signup"
                    sx={{ ml: 2 }}
                  >
                    Sign up
                  </Button>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("")',
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
              Kota Store Management Made Simple
            </Typography>
          </Fade>
          
          <Fade in={animate} timeout={1500}>
            <Typography
              variant="h5"
              paragraph
              sx={{ mb: 4, opacity: 0.9 }}
            >
              Streamline operations, boost customer satisfaction, and grow your business with our all-in-one platform.
            </Typography>
          </Fade>
          
          <Fade in={animate} timeout={2000}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                component={RouterLink}
                to="/owner/signup"
                sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }}
              >
                Get Started Free
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                component={RouterLink}
                to="/demo"
                sx={{ 
                  py: 1.5, 
                  px: 4, 
                  fontSize: '1.1rem',
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Watch Demo
              </Button>
            </Stack>
          </Fade>
          
          <Fade in={animate} timeout={2500}>
            <Typography
              variant="body2"
              sx={{ mt: 2, opacity: 0.7 }}
            >
              No credit card required • Free 30-day trial
            </Typography>
          </Fade>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Slide direction="up" in={animate} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" gutterBottom>
              Why Kota Store Owners Choose Us
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Join thousands of successful kota stores that have transformed their business with our platform.
            </Typography>
          </Box>
        </Slide>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
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

      {/* Restaurant Types Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Slide direction="up" in={animate} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h3" gutterBottom>
                Perfect for All Kota Store Types
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                Whether you run a food truck or a fine dining establishment, our platform scales to fit your needs.
              </Typography>
            </Box>
          </Slide>

          <Grid container spacing={3}>
            {['Quick Service', 'Fine Dining', 'Cafes & Bakeries', 'Food Trucks', 'Bars & Pubs', 'Delivery Only'].map((type, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <Fade in={animate} timeout={1000 + (index * 100)}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      borderRadius: 2,
                      border: 1,
                      borderColor: 'divider',
                      transition: 'all 0.3s',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white'
                      }
                    }}
                  >
                    <Typography variant="subtitle1">{type}</Typography>
                  </Paper>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Slide direction="up" in={animate} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" gutterBottom>
              What Our Customers Say
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Don't just take our word for it — hear from restaurant owners who use our platform every day.
            </Typography>
          </Box>
        </Slide>

        <Grid container spacing={4}>
          {[
            {
              name: "Maria Rodriguez",
              role: "Owner, La Casa Bistro",
              quote: "Since implementing FoodHub, we've seen a 30% increase in online orders and our staff loves how easy it is to use.",
              image: "https://source.unsplash.com/random/100x100/?portrait,woman"
            },
            {
              name: "James Chen",
              role: "Manager, Urban Spice",
              quote: "The analytics tools have been eye-opening. We've optimized our menu and increased our profit margins within just two months.",
              image: "https://source.unsplash.com/random/100x100/?portrait,man"
            },
            {
              name: "Sarah Johnson",
              role: "Owner, Breakfast Club",
              quote: "Customer support is phenomenal. Whenever we have questions, the team responds almost immediately with helpful solutions.",
              image: "https://source.unsplash.com/random/100x100/?portrait,woman2"
            }
          ].map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in={animate} timeout={1000 + (index * 300)}>
                <Card 
                  elevation={2}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 2
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', mb: 3 }}>
                      "{testimonial.quote}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 50, height: 50, borderRadius: '50%', mr: 2 }}
                        image={testimonial.image}
                        alt={testimonial.name}
                      />
                      <Box>
                        <Typography variant="subtitle2">{testimonial.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{testimonial.role}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
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
              Ready to Transform Your Kota Store?
            </Typography>
          </Fade>
          <Fade in={animate} timeout={1500}>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join dozens of kota stores already growing their business with Kasi Kotas.
            </Typography>
          </Fade>
          <Fade in={animate} timeout={2000}>
            <Button
              component={RouterLink}
              to="/owner/signup"
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
              Start Your Free Trial
            </Button>
          </Fade>
          <Fade in={animate} timeout={2500}>
            <Typography variant="body2" sx={{ mt: 2, opacity: 0.7 }}>
              No credit card required • Cancel anytime
            </Typography>
          </Fade>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Slide direction="up" in={animate} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" gutterBottom>
              Frequently Asked Questions
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Have questions? We've got answers.
            </Typography>
          </Box>
        </Slide>

        <Grid container spacing={3}>
          {[
            {
              question: "How long does it take to get set up?",
              answer: "Most restaurants are up and running within a day. Our onboarding team helps you import your menu and configure settings to match your needs."
            },
            {
              question: "Do I need technical knowledge to use the platform?",
              answer: "Not at all! Our platform is designed to be user-friendly for restaurant owners of all technical abilities. Plus, our support team is always ready to help."
            },
            {
              question: "Can I integrate with my existing POS system?",
              answer: "Yes! We integrate with most major POS systems. During onboarding, we'll guide you through connecting your existing tools."
            },
            {
              question: "What if I need help or have questions?",
              answer: "Our support team is available 24/7 via chat, email, or phone. We also offer extensive documentation and video tutorials."
            }
          ].map((faq, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Fade in={animate} timeout={1000 + (index * 200)}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {faq.question}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            component={RouterLink} 
            to="/faq" 
            color="primary" 
            endIcon={<ExpandMoreIcon />}
          >
            View more FAQs
          </Button>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default OwnersWelcomePage;