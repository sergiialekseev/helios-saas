import { AutoGraph, ChatBubbleOutline, RocketLaunch, Security } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Drawer,
  Fab,
  Grid,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { ChatKit, useChatKit } from '@openai/chatkit-react';
import { useEffect, useMemo, useState } from 'react';
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

type StripePrice = {
  id: string;
  unitAmount: number | null;
  currency: string;
  interval: string | null;
  intervalCount: number | null;
  product: {
    id: string;
    name: string;
    description: string | null;
  } | null;
};

const Landing = () => {
  const apiBaseUrl = useMemo(() => import.meta.env.VITE_API_BASE_URL, []);
  const [prices, setPrices] = useState<StripePrice[]>([]);
  const [pricesLoading, setPricesLoading] = useState(true);
  const [pricingError, setPricingError] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatDeviceId] = useState(() => {
    if (typeof window === 'undefined') {
      return 'server';
    }

    const storageKey = 'chatkit_device_id';
    const existing = window.localStorage.getItem(storageKey);
    if (existing) {
      return existing;
    }

    const next =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `device_${Date.now()}_${Math.random().toString(16).slice(2)}`;

    window.localStorage.setItem(storageKey, next);
    return next;
  });

  const { control } = useChatKit({
    api: {
      async getClientSecret(existing) {
        if (existing) {
          return existing;
        }

        const response = await fetch(`${apiBaseUrl}/api/chatkit/session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deviceId: chatDeviceId })
        });

        if (!response.ok) {
          throw new Error('ChatKit session failed');
        }

        const data = (await response.json()) as { client_secret?: string };
        if (!data.client_secret) {
          throw new Error('Missing ChatKit client secret');
        }

        return data.client_secret;
      }
    }
  });

  useEffect(() => {
    let active = true;

    const loadPrices = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/stripe/prices`);
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = (await response.json()) as { prices?: StripePrice[] };
        if (active) {
          setPrices(data.prices ?? []);
        }
      } catch {
        if (active) {
          setPricingError('Pricing is unavailable right now. Please try again later.');
        }
      } finally {
        if (active) {
          setPricesLoading(false);
        }
      }
    };

    loadPrices();

    return () => {
      active = false;
    };
  }, [apiBaseUrl]);

  const formatAmount = (price: StripePrice) => {
    if (price.unitAmount === null) {
      return 'Custom';
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency.toUpperCase()
    }).format(price.unitAmount / 100);
  };

  const handleCheckout = async (priceId: string) => {
    setCheckoutLoading(priceId);
    setPricingError('');

    try {
      const response = await fetch(`${apiBaseUrl}/api/stripe/checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId })
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const data = (await response.json()) as { url?: string };

      if (!data.url) {
        throw new Error('Missing checkout URL');
      }

      window.location.assign(data.url);
    } catch {
      setPricingError('Unable to start checkout. Please try again.');
      setCheckoutLoading(null);
    }
  };

  return (
    <Box>
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
                  SaaS starter kit (test)
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

      <Box id="pricing" py={{ xs: 6, md: 10 }}>
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack spacing={1} alignItems="flex-start">
              <Typography variant="overline" sx={{ letterSpacing: '0.3em', color: 'text.secondary' }}>
                Pricing
              </Typography>
              <Typography variant="h3">Choose the plan that fits your launch</Typography>
              <Typography color="text.secondary">
                Start with a monthly plan and upgrade anytime. Cancel whenever you need to.
              </Typography>
            </Stack>

            {pricingError ? <Alert severity="warning">{pricingError}</Alert> : null}

            {pricesLoading ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <CircularProgress size={22} />
                <Typography color="text.secondary">Loading pricing…</Typography>
              </Stack>
            ) : null}

            {!pricesLoading && prices.length === 0 && !pricingError ? (
              <Typography color="text.secondary">Pricing will be available soon.</Typography>
            ) : null}

            {!pricesLoading && prices.length > 0 ? (
              <Grid container spacing={4}>
                {prices.map((price, index) => {
                  const intervalLabel = price.interval ? `/${price.interval}` : '';
                  const isPrimary = index === 0;
                  const planName = price.product?.name ?? 'Subscription plan';
                  const planDescription = price.product?.description ?? 'Access the full starter kit.';

                  return (
                    <Grid item xs={12} md={6} key={price.id}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 4,
                          borderRadius: 4,
                          border: '1px solid rgba(11, 114, 133, 0.16)',
                          background: isPrimary
                            ? 'linear-gradient(135deg, #ffffff 0%, #f0fbfa 100%)'
                            : 'linear-gradient(135deg, #ffffff 0%, #f6f3ef 100%)'
                        }}
                      >
                        <Stack spacing={2}>
                          {isPrimary ? (
                            <Box
                              sx={{
                                alignSelf: 'flex-start',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 999,
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText'
                              }}
                            >
                              <Typography variant="caption" sx={{ letterSpacing: '0.2em' }}>
                                MOST POPULAR
                              </Typography>
                            </Box>
                          ) : null}
                          <Box>
                            <Typography variant="h5">{planName}</Typography>
                            <Typography color="text.secondary">{planDescription}</Typography>
                          </Box>
                          <Stack direction="row" spacing={1} alignItems="baseline">
                            <Typography variant="h3">{formatAmount(price)}</Typography>
                            <Typography color="text.secondary">{intervalLabel}</Typography>
                          </Stack>
                          <Button
                            variant={isPrimary ? 'contained' : 'outlined'}
                            size="large"
                            onClick={() => handleCheckout(price.id)}
                            disabled={checkoutLoading === price.id}
                          >
                            {checkoutLoading === price.id ? 'Redirecting…' : 'Start subscription'}
                          </Button>
                          <Typography variant="caption" color="text.secondary">
                            Secure checkout powered by Stripe.
                          </Typography>
                        </Stack>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            ) : null}
          </Stack>
        </Container>
      </Box>

      <Fab
        color="primary"
        variant="extended"
        onClick={() => setChatOpen(true)}
        sx={{
          position: 'fixed',
          right: { xs: 16, md: 32 },
          bottom: { xs: 16, md: 32 },
          zIndex: 1200
        }}
      >
        <ChatBubbleOutline sx={{ mr: 1 }} />
        Chat with us
      </Fab>

      <Drawer
        anchor="right"
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 380 },
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6">ChatKit</Typography>
            <Typography variant="body2" color="text.secondary">
              Ask anything about the starter kit.
            </Typography>
          </Box>
          <Button onClick={() => setChatOpen(false)}>Close</Button>
        </Stack>
        <Box sx={{ flex: 1, minHeight: 420 }}>
          <ChatKit control={control} style={{ width: '100%', height: '100%' }} />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Landing;
