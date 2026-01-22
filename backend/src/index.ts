import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const envPaths = [path.resolve(process.cwd(), '.env'), path.resolve(process.cwd(), 'src', '.env')];
for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
const app = express();
const port = Number(process.env.PORT) || 8080;
const corsOrigin = process.env.CORS_ORIGIN || '*';
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: '2025-12-15.clover' })
  : null;
const openaiApiKey = process.env.OPENAI_API_KEY;
const chatkitWorkflowId =
  process.env.CHATKIT_WORKFLOW_ID || 'wf_6952c7810524819099b6ce9bc60beec604d7b5f40ae1954c';
const defaultPriceIds = ['price_1SmBryAj9VxgbXq8YNG0LinU', 'price_1SmBreAj9VxgbXq8HXY5QCfT'];
const envPriceIds = (process.env.STRIPE_PRICE_IDS ?? '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);
const priceIdList = envPriceIds.length > 0 ? envPriceIds : defaultPriceIds;
const allowedPriceIds = new Set(priceIdList);
const normalizeBaseUrl = (value: string) => value.replace(/\/+$/, '');
const frontendBaseUrl = normalizeBaseUrl(
  process.env.FRONTEND_BASE_URL || (corsOrigin !== '*' ? corsOrigin : 'http://localhost:5173')
);

app.use(cors(corsOrigin === '*' ? { origin: true } : { origin: corsOrigin }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'saas-backend' });
});

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from Cloud Run', timestamp: new Date().toISOString() });
});

app.post('/api/chatkit/session', async (req, res) => {
  if (!openaiApiKey) {
    return res.status(500).json({ error: 'OpenAI is not configured.' });
  }

  const { deviceId } = req.body as { deviceId?: string };

  if (!deviceId) {
    return res.status(400).json({ error: 'deviceId is required.' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'chatkit_beta=v1',
        Authorization: `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        workflow: { id: chatkitWorkflowId },
        user: deviceId
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ChatKit session error', errorText);
      return res.status(500).json({ error: 'Failed to create ChatKit session.' });
    }

    const data = (await response.json()) as { client_secret?: string };

    if (!data.client_secret) {
      return res.status(500).json({ error: 'ChatKit session missing client secret.' });
    }

    return res.json({ client_secret: data.client_secret });
  } catch (error) {
    console.error('ChatKit session failed', error);
    return res.status(500).json({ error: 'Failed to create ChatKit session.' });
  }
});

app.get('/api/stripe/prices', async (_req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: 'Stripe is not configured.' });
  }

  try {
    const prices = await Promise.all(
      priceIdList.map(async (priceId) => {
        const price = await stripe.prices.retrieve(priceId, { expand: ['product'] });
        const product = typeof price.product === 'object' ? (price.product as Stripe.Product) : null;

        return {
          id: price.id,
          unitAmount: price.unit_amount,
          currency: price.currency,
          interval: price.recurring?.interval ?? null,
          intervalCount: price.recurring?.interval_count ?? null,
          product: product
            ? {
                id: product.id,
                name: product.name,
                description: product.description
              }
            : null
        };
      })
    );

    return res.json({ prices });
  } catch (error) {
    console.error('Stripe price fetch failed', error);
    return res.status(500).json({ error: 'Failed to load prices.' });
  }
});

app.post('/api/stripe/checkout-session', async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: 'Stripe is not configured.' });
  }

  const { priceId, quantity } = req.body as { priceId?: string; quantity?: number };

  if (!priceId || !allowedPriceIds.has(priceId)) {
    return res.status(400).json({ error: 'Invalid price ID.' });
  }

  const sanitizedQuantity =
    Number.isInteger(quantity) && typeof quantity === 'number' && quantity > 0
      ? Math.min(quantity, 99)
      : 1;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: sanitizedQuantity
        }
      ],
      success_url: `${frontendBaseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendBaseUrl}/checkout/cancel`,
      billing_address_collection: 'auto',
      allow_promotion_codes: true
    });

    if (!session.url) {
      return res.status(500).json({ error: 'Checkout session is missing a redirect URL.' });
    }

    return res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout session failed', error);
    return res.status(500).json({ error: 'Failed to create checkout session.' });
  }
});

app.get('/api/stripe/checkout-session', async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: 'Stripe is not configured.' });
  }

  const sessionId = req.query.session_id;

  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(400).json({ error: 'session_id is required.' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product']
    });

    const lineItems =
      session.line_items?.data.map((item) => {
        const price = item.price;
        const product =
          typeof price?.product === 'object' ? (price?.product as Stripe.Product) : null;

        return {
          priceId: price?.id ?? null,
          productName: product?.name ?? null,
          quantity: item.quantity ?? null,
          unitAmount: price?.unit_amount ?? null,
          currency: price?.currency ?? null,
          interval: price?.recurring?.interval ?? null
        };
      }) ?? [];

    return res.json({
      id: session.id,
      status: session.status,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
      amountTotal: session.amount_total ?? null,
      currency: session.currency ?? null,
      lineItems
    });
  } catch (error) {
    console.error('Stripe session lookup failed', error);
    return res.status(500).json({ error: 'Failed to load checkout session.' });
  }
});

app.post('/api/notes', async (req, res) => {
  const { text, uid } = req.body as { text?: string; uid?: string };

  if (!text || !uid) {
    return res.status(400).json({ error: 'text and uid are required' });
  }

  const docRef = await db.collection('serverNotes').add({
    text,
    uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  return res.status(201).json({ id: docRef.id });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
