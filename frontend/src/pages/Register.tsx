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
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState, type FormEvent } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { firebaseAuth, googleProvider } from '@/firebase';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Try a different email or stronger password.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(firebaseAuth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError('Google sign-up failed. Please try again.');
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
              <Typography variant="h4">Create your account</Typography>
              <Typography color="text.secondary">
                Start building your SaaS workspace in minutes.
              </Typography>
            </Box>
            {error ? <Alert severity="error">{error}</Alert> : null}
            <Button
              variant="outlined"
              startIcon={<Google />}
              onClick={handleGoogleRegister}
              disabled={loading}
            >
              Sign up with Google
            </Button>
            <Divider>or</Divider>
            <Box component="form" onSubmit={handleEmailRegister}>
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
                  helperText="Use at least 6 characters"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  fullWidth
                />
                <Button type="submit" variant="contained" size="large" disabled={loading}>
                  Create account
                </Button>
              </Stack>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Button component={RouterLink} to="/login" size="small">
                Sign in
              </Button>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
