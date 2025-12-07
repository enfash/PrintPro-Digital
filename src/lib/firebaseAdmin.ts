import admin from 'firebase-admin';

// Function to check if all required environment variables for Firebase are set
function areFirebaseCredsComplete(creds: Partial<admin.ServiceAccount>): creds is admin.ServiceAccount {
    return (
        !!creds.project_id &&
        !!creds.private_key &&
        !!creds.client_email
    );
}

function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return {
      adminDb: admin.firestore(),
      adminStorage: admin.storage(),
    };
  }

  const serviceAccountEnv: Partial<admin.ServiceAccount> = {
    project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  };

  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

  if (areFirebaseCredsComplete(serviceAccountEnv) && storageBucket) {
    try {
      console.log('✅ Initializing Firebase Admin SDK from environment variables.');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountEnv),
        storageBucket: storageBucket,
      });
      return {
        adminDb: admin.firestore(),
        adminStorage: admin.storage(),
      };
    } catch (error: any) {
      console.error('❌ Firebase Admin SDK initialization error:', error.message);
      return { adminDb: null, adminStorage: null };
    }
  } else {
    console.warn('⚠️ Incomplete Firebase Admin credentials in environment variables. Server-side Firebase services will not be available.');
    return { adminDb: null, adminStorage: null };
  }
}

const { adminDb, adminStorage } = initializeFirebaseAdmin();
export { adminDb, adminStorage };
