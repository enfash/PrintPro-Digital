import admin from 'firebase-admin';

if (!admin.apps.length) {
    try {
        const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '';
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
            storageBucket: storageBucket,
        });
    } catch (error: any) {
        console.error('Firebase admin initialization error', error.stack);
    }
}

export const adminDb = admin.firestore();
export const adminStorage = admin.storage();
