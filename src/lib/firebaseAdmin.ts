import admin from 'firebase-admin';

// Function to check if all required environment variables for Firebase are set
function areFirebaseCredsComplete(creds: Partial<admin.ServiceAccount>): creds is admin.ServiceAccount {
    return (
        !!creds.type &&
        !!creds.project_id &&
        !!creds.private_key_id &&
        !!creds.private_key &&
        !!creds.client_email &&
        !!creds.client_id &&
        !!creds.auth_uri &&
        !!creds.token_uri &&
        !!creds.auth_provider_x509_cert_url &&
        !!creds.client_x509_cert_url
    );
}

function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.apps[0];
  }

  try {
    const serviceAccountEnv: Partial<admin.ServiceAccount> = {
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      // Ensure private key is correctly formatted
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
    };
    
    // Only initialize if all credentials are provided
    if (areFirebaseCredsComplete(serviceAccountEnv)) {
      console.log('✅ Initializing Firebase Admin SDK from environment variables.');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountEnv),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
      return admin.apps[0];
    } else {
      console.warn('⚠️ Incomplete Firebase Admin credentials in environment variables. Server-side Firebase services will not be available.');
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
