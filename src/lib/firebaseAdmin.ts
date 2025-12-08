
import * as admin from 'firebase-admin';

let adminDb: admin.firestore.Firestore | null = null;
let adminStorage: admin.storage.Storage | null = null;
let adminApp: admin.app.App | null = null;

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

const isConfigured =
  process.env.FIREBASE_PROJECT_ID &&
  privateKey &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

if (isConfigured && !admin.apps.length) {
  try {
    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

    adminApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: privateKey,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
      storageBucket: bucketName,
    });

    adminDb = admin.firestore();
    adminStorage = admin.storage();
    console.log('✅ Firebase Admin SDK initialized successfully.');

  } catch (e: any) {
    console.error('❌ Failed to initialize Firebase Admin SDK:', e.message);
  }
} else if (!admin.apps.length) {
  console.warn(
    '⚠️ Firebase Admin environment variables are not set. Server-side Firebase features will be disabled.'
  );
} else {
    adminApp = admin.apps[0];
    if (adminApp) {
        adminDb = admin.firestore(adminApp);
        adminStorage = admin.storage(adminApp);
    }
}

export { adminDb, adminStorage, adminApp };
