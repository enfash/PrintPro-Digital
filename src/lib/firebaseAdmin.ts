import admin from 'firebase-admin';
import serviceAccount from '../../service-account.json';

if (!admin.apps.length) {
    try {
        const serviceAccountTyped = serviceAccount as admin.ServiceAccount;
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccountTyped),
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        });
    } catch (error: any) {
        console.error('Firebase admin initialization error', error.stack);
    }
}

export const adminDb = admin.firestore();
export const adminStorage = admin.storage();
