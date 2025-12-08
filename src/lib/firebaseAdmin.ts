'use server';

import * as admin from 'firebase-admin';

let app: admin.app.App;

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

const isConfigured =
  process.env.FIREBASE_PROJECT_ID &&
  privateKey &&
  process.env.FIREBASE_CLIENT_EMAIL;

if (isConfigured && !admin.apps.length) {
  try {
    app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: privateKey,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
      storageBucket: 'studio-next-bom-lf', // Explicitly set the custom bucket name
    });
    console.log('✅ Firebase Admin SDK initialized successfully.');
  } catch (e: any) {
    console.error(
      '❌ Failed to initialize Firebase Admin SDK:',
      e.message
    );
  }
} else if (!admin.apps.length) {
  console.warn(
    '⚠️ Firebase Admin environment variables are not set. Server-side Firebase features will be disabled.'
  );
}

const adminDb = admin.apps.length ? admin.firestore() : null;
const adminStorage = admin.apps.length ? admin.storage() : null;


export { adminDb, adminStorage, app as adminApp };
