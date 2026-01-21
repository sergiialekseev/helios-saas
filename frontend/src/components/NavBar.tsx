import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '@/firebase';
import { useAuth } from '@/auth/AuthContext';

const NavBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(firebaseAuth);
    navigate('/');
  };

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(12px)' }}>
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
        <Typography
          component={RouterLink}
          to="/"
          variant="h6"
          sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 700 }}
        >
          Helios SaaS
        </Typography>
        <Box display="flex" gap={1} alignItems="center">
          <Button component={RouterLink} to="/" color="inherit">
            Home
          </Button>
          {user ? (
            <>
              <Button component={RouterLink} to="/dashboard" color="inherit">
                Dashboard
              </Button>
              <Button variant="contained" color="primary" onClick={handleSignOut}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/login" color="inherit">
                Log in
              </Button>
              <Button component={RouterLink} to="/register" variant="contained" color="primary">
                Start free
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
