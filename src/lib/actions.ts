
'use server';

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { Resend } from 'resend';
import { generateAdminEmailHTML, generateCustomerEmailHTML } from '@/lib/email-template';
import { ContactFormSchema } from '@/lib/schema';
import { headers } from 'next/headers';
import { randomBytes } from 'crypto';

let adminApp: App | null = null;
let resend: Resend | null = null;

// In-memory fallback for rate limiting when Firestore is unavailable (e.g. local dev).
// Not shared across serverless instances — Firestore is used in production.
const inMemoryStore: Record<string, { count: number; expiry: number }> = {};
const RATE_LIMIT_COUNT = 5;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes

function initializeServices() {
  if (!resend) {
    if (process.env.RESEND_API_KEY) {
      resend = new Resend(process.env.RESEND_API_KEY);
    } else {
      console.warn("RESEND_API_KEY is not set. Email sending will be disabled.");
    }
  }

  if (adminApp) return;

  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const isConfigured =
    process.env.FIREBASE_PROJECT_ID &&
    privateKey &&
    process.env.FIREBASE_CLIENT_EMAIL;

  if (isConfigured && !getApps().length) {
    try {
      adminApp = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: privateKey,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
      console.log('✅ Firebase Admin SDK initialized on-demand.');
    } catch (e: any) {
      console.error('❌ Failed to initialize Firebase Admin SDK:', e.message);
      adminApp = null;
    }
  } else if (getApps().length) {
    adminApp = getApps()[0];
  } else {
    console.warn('⚠️ Firebase Admin environment variables are not fully set. Server-side Firebase features may be disabled.');
  }
}

async function isRateLimited(ip: string): Promise<boolean> {
  // Prefer Firestore so the limit works across all serverless instances
  if (adminApp) {
    try {
      const db = getFirestore(adminApp);
      const sanitizedIp = ip.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 128);
      const ref = db.collection('rate_limits').doc(sanitizedIp);
      const now = Date.now();

      const limited = await db.runTransaction(async (tx) => {
        const doc = await tx.get(ref);
        const data = doc.data() as { count: number; windowStart: number } | undefined;

        if (!data || now - data.windowStart > RATE_LIMIT_WINDOW) {
          tx.set(ref, { count: 1, windowStart: now });
          return false;
        }
        if (data.count >= RATE_LIMIT_COUNT) return true;
        tx.update(ref, { count: data.count + 1 });
        return false;
      });

      return limited;
    } catch (e) {
      console.warn('⚠️ Firestore rate limit check failed, falling back to in-memory:', e);
    }
  }

  // In-memory fallback
  const now = Date.now();
  Object.keys(inMemoryStore).forEach((k) => {
    if (inMemoryStore[k].expiry < now) delete inMemoryStore[k];
  });
  const entry = inMemoryStore[ip] ?? { count: 0, expiry: now + RATE_LIMIT_WINDOW };
  if (entry.count >= RATE_LIMIT_COUNT) return true;
  inMemoryStore[ip] = { count: entry.count + 1, expiry: entry.expiry };
  return false;
}

type ContactFormState = {
  success: boolean;
  message: string;
  errors?: { [key: string]: string[] };
};

function getJobTypeFolder(jobType: string): string {
  switch (jobType) {
    case 'Flex Banner': return 'flex-banner';
    case 'Self-Adhesive Vinyl (SAV)': return 'sav';
    case 'Window / Clear Sticker': return 'window-clear-sticker';
    default: return 'other';
  }
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {

  initializeServices();

  const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1';

  if (await isRateLimited(ip)) {
    return {
      success: false,
      message: 'You have submitted too many requests. Please try again later.',
    };
  }

  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    jobType: formData.get('jobType'),
    width: formData.get('width'),
    height: formData.get('height'),
    unit: formData.get('unit'),
    qty: formData.get('qty'),
    message: formData.get('message'),
    file: formData.get('file'),
    uploadedFilePath: formData.get('uploadedFilePath'),
    uploadedFileName: formData.get('uploadedFileName'),
    uploadedFileSize: formData.get('uploadedFileSize'),
    agreeToTerms: formData.get('agreeToTerms') === 'on',
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed. Please check the fields.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, phone, email, jobType, width, height, unit, qty, message, file, uploadedFilePath, uploadedFileName, uploadedFileSize } = validatedFields.data;

  // Cryptographically random 6-char hex reference ID
  const refId = randomBytes(3).toString('hex').toUpperCase();

  let fileSignedUrl: string | null = null;
  let filePath: string | null = null;
  let fileName: string | null = null;
  let fileSize: number | null = null;

  if (uploadedFilePath) {
    filePath = uploadedFilePath;
    fileName = uploadedFileName || null;
    fileSize = uploadedFileSize ? parseInt(uploadedFileSize) : null;

    if (adminApp) {
      try {
        const storage = getStorage(adminApp);
        const bucket = storage.bucket();
        const fileRef = bucket.file(filePath);

        // Generate a 7-day signed URL for the admin email
        try {
          const [signedUrl] = await fileRef.getSignedUrl({
            action: 'read',
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
          });
          fileSignedUrl = signedUrl;
        } catch (signedUrlError) {
          console.warn('⚠️ Could not generate signed URL for pre-uploaded file:', signedUrlError);
        }
      } catch (e) {
        console.error('❌ Failed to fetch pre-uploaded file:', e);
      }
    }
  } else if (file && file.size > 0) {
    fileName = file.name;
    fileSize = file.size;
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    if (!adminApp) {
      console.error('Firebase Admin is not initialized. Cannot upload file.');
      return { success: false, message: 'Server configuration error: Storage service unavailable.' };
    }

    try {
      const storage = getStorage(adminApp);
      const bucket = storage.bucket();
      const jobTypeFolder = getJobTypeFolder(jobType);
      filePath = `submissions/${jobTypeFolder}/${refId}-${fileName}`;
      const fileRef = bucket.file(filePath);

      await fileRef.save(fileBuffer, {
        metadata: { contentType: file.type },
      });

      // Generate a 7-day signed URL for the admin email — file stays private
      try {
        const [signedUrl] = await fileRef.getSignedUrl({
          action: 'read',
          expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        });
        fileSignedUrl = signedUrl;
      } catch (signedUrlError) {
        console.warn('⚠️ Could not generate signed URL — file uploaded but link unavailable:', signedUrlError);
      }

    } catch (storageError: any) {
      console.error(`❌ Failed to upload file:`, storageError);
      return { success: false, message: `Failed to upload file. Please try again.` };
    }
  }

  if (adminApp) {
    try {
      const db = getFirestore(adminApp);
      await db.collection('submissions').doc(refId).set({
        refId, name, phone,
        email: email || '',
        jobType, width, height, unit, qty, message,
        filePath,     // store path so admins can retrieve the file at any time
        fileName, fileSize,
        agreeToUpdates: validatedFields.data.agreeToTerms,
        submittedAt: new Date().toISOString(),
      });
    } catch (firestoreError: any) {
      console.error(`❌ Failed to save submission:`, firestoreError);
      return { success: false, message: `Failed to save your request. Please try again.` };
    }
  }

  if (resend && process.env.RESEND_FROM_EMAIL && process.env.RESEND_TO_EMAIL) {
    try {
      const adminEmailHTML = generateAdminEmailHTML({
        name, phone, email, jobType, width, height, unit, qty, message,
        fileName: fileName || undefined,
        fileSize: fileSize || undefined,
        fileUrl: fileSignedUrl || undefined,
        agreeToUpdates: validatedFields.data.agreeToTerms,
      });

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.RESEND_TO_EMAIL,
        subject: `[#${refId}] New Order: ${jobType} - ${name}`,
        html: adminEmailHTML,
      });

      if (email) {
        const customerEmailHTML = generateCustomerEmailHTML(name, jobType);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: email,
          subject: `Order Received [#${refId}] - BOMedia`,
          html: customerEmailHTML,
        });
      }
    } catch (emailError: any) {
      console.warn('⚠️ Submission saved, but email sending failed.', emailError);
    }
  }

  return { success: true, message: 'Order received successfully!' };
}
