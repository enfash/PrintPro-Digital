
'use client';

import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
  public readonly context: SecurityRuleContext;
  private readonly app: any | null = null;
  public firebaseProject: string | null = null;
  public firestoreRules: string | null = null;
  public authentication: any | null = null;
  public requestTime: string | null = null;

  constructor(context: SecurityRuleContext) {
    const message = `FirestoreError: Missing or insufficient permissions: The following request was denied by Firestore Security Rules:`;
    super(message);
    this.name = 'FirestorePermissionError';
    this.context = context;
    this.requestTime = new Date().toISOString();

    if (typeof window !== 'undefined') {
      try {
        const { getFirebase } = require('@/firebase');
        this.app = getFirebase();
        if (this.app) {
          this.firebaseProject = this.app.options.projectId;
        }
      } catch (e) {
        console.warn('Could not get Firebase app instance for error context.');
      }
    }
  }

  async build(): Promise<this> {
    if (!this.app) {
      return this;
    }
    const auth = getAuth(this.app);
    this.authentication = auth.currentUser
      ? {
          uid: auth.currentUser.uid,
          token: await auth.currentUser.getIdTokenResult(),
        }
      : null;

    try {
      const db = getFirestore(this.app);
      const rulesDoc = doc(db, 'firebase/firestore.rules');
      const rulesSnap = await getDoc(rulesDoc);
      if (rulesSnap.exists()) {
        this.firestoreRules = rulesSnap.data().content;
      }
    } catch (e) {
      console.warn('Could not fetch Firestore rules for error context.');
    }

    return this;
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      context: this.context,
      requestTime: this.requestTime,
      authentication: this.authentication,
      firebaseProject: this.firebaseProject,
      firestoreRules: this.firestoreRules,
    };
  }
}
