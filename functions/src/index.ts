import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
import admin from 'firebase-admin';

setGlobalOptions({ region: 'us-central1' });

if (!admin.apps.length) {
  admin.initializeApp();
}

export const helloFunction = onRequest((_req, res) => {
  res.json({ message: 'Hello from Cloud Functions' });
});

export const serverTimestamp = onRequest(async (_req, res) => {
  const db = admin.firestore();
  const ref = db.collection('server').doc('metadata');
  await ref.set({ updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
  const snapshot = await ref.get();

  res.json({
    message: 'Server timestamp updated',
    data: snapshot.data() ?? {}
  });
});
