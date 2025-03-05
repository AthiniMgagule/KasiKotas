import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  IconButton,
  Divider,
  useTheme
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Send as SendIcon
} from '@mui/icons-material';

const footer = () => {
  const [email, setEmail] = useState('');
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Here you would connect to your backend to handle the subscription
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper',
        borderTop: 1, 
        borderColor: 'divider',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info and Social Links */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="primary" gutterBottom>
              Kasi Kotas
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Helping restaurant owners manage their business efficiently and grow their customer base.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton 
                color="primary" 
                aria-label="Facebook" 
                component="a" 
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                aria-label="Twitter" 
                component="a" 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                aria-label="Instagram" 
                component="a" 
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                aria-label="LinkedIn" 
                component="a" 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {['Dashboard', 'Manage Menu', 'Orders', 'Reports', 'Account Settings'].map((item) => (
                <Box component="li" key={item} sx={{ py: 0.5 }}>
                  <Link 
                    component={RouterLink} 
                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    color="text.secondary"
                    underline="hover"
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          
          {/* Resources */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Resources
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {[
                { name: 'Help Center', path: '/help' },
                { name: 'Blog', path: '/blog' },
                { name: 'Video Tutorials', path: '/tutorials' },
                { name: 'Partner Program', path: '/partners' },
                { name: 'API Documentation', path: '/api' }
              ].map((item) => (
                <Box component="li" key={item.name} sx={{ py: 0.5 }}>
                  <Link 
                    component={RouterLink} 
                    to={item.path}
                    color="text.secondary"
                    underline="hover"
                  >
                    {item.name}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          
          {/* Newsletter */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Subscribe to receive updates, tips, and special offers.
            </Typography>
            <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex' }}>
              <TextField
                size="small"
                placeholder="Your email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mr: 1 }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        {/* Bottom section with legal links */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {[
              { name: 'Terms of Service', path: '/terms' },
              { name: 'Privacy Policy', path: '/privacy' },
              { name: 'Cookie Policy', path: '/cookies' },
              { name: 'Accessibility', path: '/accessibility' }
            ].map((item) => (
              <Link 
                key={item.name}
                component={RouterLink}
                to={item.path}
                color="text.secondary"
                underline="hover"
                sx={{ fontSize: '0.875rem' }}
              >
                {item.name}
              </Link>
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: { xs: 2, sm: 0 } }}>
            &copy; {currentYear} Kasi Kotas. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default footer;