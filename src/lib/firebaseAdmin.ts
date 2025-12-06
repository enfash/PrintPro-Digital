import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// This function must only be called on the server.
function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return;
  }

  try {
    const serviceAccountPath = path.resolve(process.cwd(), 'service-account.json');

    if (!fs.existsSync(serviceAccountPath)) {
      console.error('Firebase Admin SDK Error: `service-account.json` not found.');
      console.error('Please ensure the service account file is present at the root of your project.');
      // If the file doesn't exist, we can't initialize.
      // This prevents the app from crashing if the file is missing.
      return;
    }

    const serviceAccountString = fs.readFileSync(serviceAccountPath, 'utf8');
    const serviceAccount = JSON.parse(serviceAccountString);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'studio-next-bom-lf',
    });

    console.log('✅ Firebase Admin SDK initialized successfully.');

  } catch (error: any) {
    console.error('❌ Firebase Admin SDK initialization error:', error.stack);
  }
}

// Initialize immediately when this module is loaded on the server.
initializeFirebaseAdmin();

// Export the initialized services.
// If initialization failed, these will throw a clear error when used.
export const adminDb = admin.firestore();
export const adminStorage = admin.storage();
