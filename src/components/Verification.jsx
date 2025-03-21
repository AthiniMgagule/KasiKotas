import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography, Container, Alert, Button } from '@mui/material';

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState({ message: 'Verifying email...', isLoading: true, isError: false });

  useEffect(() => {
    const verifyEmail = async () => {
      const token = new URLSearchParams(location.search).get('token');
      window.history.replaceState({}, document.title, window.location.pathname);

      if (!token) {
        setStatus({ message: 'Invalid verification link.', isLoading: false, isError: true });
        return;
      }

      try {
        const response = await fetch(`https://kasikotas-api.onrender.com/verify-email?token=${token}`);
        if (response.ok) {
          setStatus({ message: 'Email verified. Redirecting...', isLoading: false });
          setTimeout(() => navigate('owner/login', { replace: true }), 3000);
        } else {
          setStatus({ message: 'Verification failed. Try again.', isLoading: false, isError: true });
        }
      } catch {
        setStatus({ message: 'Connection error. Try again later.', isLoading: false, isError: true });
      }
    };

    verifyEmail();
  }, [location, navigate]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', justifyContent: 'center' }}>
        {status.isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Alert severity={status.isError ? 'error' : 'success'}>{status.message}</Alert>
            {status.isError && <Button onClick={() => navigate('/resend-verification')}>Resend Email</Button>}
          </>
        )}
      </Box>
    </Container>
  );
}

export default VerifyEmail;