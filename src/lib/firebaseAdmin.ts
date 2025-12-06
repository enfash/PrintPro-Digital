import admin from 'firebase-admin';

function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.apps[0];
  }

  // Fallback to environment variables if they exist
  try {
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
      console.warn('⚠️ Firebase Admin credentials not found in environment variables. Server-side Firebase services will not be available.');
      return null;
    }
  } catch (error: any) {
    console.error('❌ Firebase Admin SDK initialization error:', error.stack);
    return null;
  }
}

const app = initializeFirebaseAdmin();
export const adminDb = app ? admin.firestore() : null;
export const adminStorage = app ? admin.storage() : null;
