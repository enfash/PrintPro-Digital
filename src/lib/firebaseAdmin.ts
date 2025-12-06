import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// This function must only be called on the server.
function initializeFirebaseAdmin() {
  // If the app is already initialized, don't do it again.
  if (admin.apps.length > 0) {
    return admin.apps[0];
  }

  try {
    const serviceAccountPath = path.resolve(process.cwd(), 'service-account.json');

    // Check if the service account file exists.
    if (!fs.existsSync(serviceAccountPath)) {
      // In a production or deployed environment, you might not have the file.
      // Attempt to use environment variables.
      const serviceAccountEnv = {
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
      } as admin.ServiceAccount;

      if (serviceAccountEnv.private_key && serviceAccountEnv.client_email) {
        console.log('✅ Initializing Firebase Admin SDK from environment variables.');
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccountEnv),
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        });
        return admin.apps[0];
      } else {
         throw new Error('Firebase Admin credentials not found in environment variables.');
      }
    } else {
      // If the file exists, use it.
      console.log('✅ Initializing Firebase Admin SDK from service-account.json.');
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: serviceAccount.project_id + '.appspot.com',
      });
      return admin.apps[0];
    }
  } catch (error: any) {
    console.error('❌ Firebase Admin SDK initialization error:', error.stack);
    // Re-throw the error to make it clear that initialization failed.
    throw error;
  }
}

// Initialize and export the services.
const app = initializeFirebaseAdmin();
export const adminDb = app ? admin.firestore() : null;
export const adminStorage = app ? admin.storage() : null;
