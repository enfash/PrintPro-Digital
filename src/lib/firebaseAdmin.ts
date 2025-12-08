

import * as admin from 'firebase-admin';

// This file is now deprecated. The initialization logic has been moved
// directly into the server action that needs it (`src/lib/actions.ts`).
// This ensures services are initialized on-demand with the correct
// production environment variables.

// We export null values to prevent other parts of the app from
// attempting to use a stale or non-existent admin instance.
export const adminDb: admin.firestore.Firestore | null = null;
export const adminStorage: admin.storage.Storage | null = null;
export const adminApp: admin.app.App | null = null;

console.warn("`src/lib/firebaseAdmin.ts` is deprecated. Admin services are now initialized on-demand within server actions.");
