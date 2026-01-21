import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const CheckoutCancel = () => {
  return (
    <Box py={{ xs: 6, md: 10 }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: '1px solid rgba(0,0,0,0.08)' }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="overline" color="text.secondary">
                Checkout canceled
              </Typography>
              <Typography variant="h4">No changes were made</Typography>
              <Typography color="text.secondary">
                You can return to pricing whenever you’re ready to subscribe.
              </Typography>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button component={RouterLink} to="/#pricing" variant="contained">
                Back to pricing
              </Button>
              <Button component={RouterLink} to="/" variant="outlined">
                Home
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default CheckoutCancel;
