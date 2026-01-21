import { AutoGraph, RocketLaunch, Security } from '@mui/icons-material';
import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const features = [
  {
    title: 'Launch-ready architecture',
    description: 'React, Firebase, and Cloud Run stitched together for fast shipping.',
    icon: <RocketLaunch fontSize="large" />
  },
  {
    title: 'Secure by default',
    description: 'Firebase Auth with Google and email/password plus Firestore rules.',
    icon: <Security fontSize="large" />
  },
  {
    title: 'Observable growth',
    description: 'Built-in API entry points ready for analytics and automation.',
    icon: <AutoGraph fontSize="large" />
  }
];

const Landing = () => {
  return (
    <Box
      sx={{
        background: 'radial-gradient(circle at top left, #e7faf9, #f7f4ef 55%, #fef6e6 100%)',
        py: { xs: 6, md: 10 }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Typography variant="overline" sx={{ letterSpacing: '0.3em', color: 'text.secondary' }}>
                SaaS starter kit
              </Typography>
              <Typography variant="h2">
                Build a bold SaaS experience with Firebase and Cloud Run
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Launch with a ready-made stack: secure auth, Firestore data, and production-grade
                deployment pipelines.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button component={RouterLink} to="/register" variant="contained" size="large">
                  Start free
                </Button>
                <Button component={RouterLink} to="/login" variant="outlined" size="large">
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #ffffff 0%, #eef9f8 100%)',
                border: '1px solid rgba(11, 114, 133, 0.12)'
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h4">What ships on day one</Typography>
                {features.map((feature) => (
                  <Stack key={feature.title} direction="row" spacing={2} alignItems="flex-start">
                    <Box color="primary.main">{feature.icon}</Box>
                    <Box>
                      <Typography variant="h6">{feature.title}</Typography>
                      <Typography color="text.secondary">{feature.description}</Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Landing;
