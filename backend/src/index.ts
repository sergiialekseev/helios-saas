import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
const app = express();
const port = Number(process.env.PORT) || 8080;
const corsOrigin = process.env.CORS_ORIGIN || '*';

app.use(cors(corsOrigin === '*' ? { origin: true } : { origin: corsOrigin }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'saas-backend' });
});

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from Cloud Run', timestamp: new Date().toISOString() });
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
