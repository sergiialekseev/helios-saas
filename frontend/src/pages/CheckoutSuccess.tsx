import { Box, Button, CircularProgress, Container, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';

type LineItem = {
  productName: string | null;
  interval: string | null;
};

type SessionSummary = {
  id: string;
  status: string | null;
  paymentStatus: string | null;
  customerEmail: string | null;
  amountTotal: number | null;
  currency: string | null;
  lineItems: LineItem[];
};

const formatAmount = (amount: number | null, currency: string | null) => {
  if (amount === null || !currency) {
    return null;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(amount / 100);
};

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const apiBaseUrl = useMemo(() => import.meta.env.VITE_API_BASE_URL, []);
  const sessionId = searchParams.get('session_id');
  const [summary, setSummary] = useState<SessionSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sessionId) {
      setError('Missing checkout session.');
      setLoading(false);
      return;
    }

    const loadSummary = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/api/stripe/checkout-session?session_id=${encodeURIComponent(sessionId)}`
        );
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = (await response.json()) as SessionSummary;
        setSummary(data);
      } catch {
        setError('Unable to load checkout confirmation.');
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, [apiBaseUrl, sessionId]);

  const primaryItem = summary?.lineItems?.[0];
  const amountLabel = formatAmount(summary?.amountTotal ?? null, summary?.currency ?? null);

  return (
    <Box py={{ xs: 6, md: 10 }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: '1px solid rgba(0,0,0,0.08)' }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="overline" color="text.secondary">
                Checkout complete
              </Typography>
              <Typography variant="h4">Payment confirmed</Typography>
              <Typography color="text.secondary">
                Thanks for subscribing. Stripe will email your receipt shortly.
              </Typography>
            </Box>

            {loading ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <CircularProgress size={22} />
                <Typography color="text.secondary">Fetching your receipt…</Typography>
              </Stack>
            ) : null}

            {error ? <Typography color="error">{error}</Typography> : null}

            {!loading && !error && summary ? (
              <Stack spacing={1}>
                {primaryItem?.productName ? (
                  <Typography>
                    Plan: <strong>{primaryItem.productName}</strong>
                  </Typography>
                ) : null}
                {amountLabel ? <Typography>Total: {amountLabel}</Typography> : null}
                {summary.customerEmail ? (
                  <Typography>Email: {summary.customerEmail}</Typography>
                ) : null}
                {summary.paymentStatus ? (
                  <Typography>Payment status: {summary.paymentStatus}</Typography>
                ) : null}
              </Stack>
            ) : null}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button component={RouterLink} to="/" variant="contained">
                Back to home
              </Button>
              <Button component={RouterLink} to="/login" variant="outlined">
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default CheckoutSuccess;
