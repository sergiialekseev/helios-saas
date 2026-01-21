import { Google } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState, type FormEvent } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { firebaseAuth, googleProvider } from '@/firebase';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(firebaseAuth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box py={{ xs: 6, md: 10 }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid rgba(0,0,0,0.08)' }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4">Welcome back</Typography>
              <Typography color="text.secondary">
                Sign in to continue building your next release.
              </Typography>
            </Box>
            {error ? <Alert severity="error">{error}</Alert> : null}
            <Button
              variant="outlined"
              startIcon={<Google />}
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              Continue with Google
            </Button>
            <Divider>or</Divider>
            <Box component="form" onSubmit={handleEmailLogin}>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  fullWidth
                />
                <Button type="submit" variant="contained" size="large" disabled={loading}>
                  Sign in
                </Button>
              </Stack>
            </Box>
            <Typography variant="body2" color="text.secondary">
              New here?{' '}
              <Button component={RouterLink} to="/register" size="small">
                Create an account
              </Button>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
