
'use server';

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { Resend } from 'resend';
import { generateAdminEmailHTML, generateCustomerEmailHTML } from '@/lib/email-template';
import { ContactFormSchema } from '@/lib/schema';

// This state is shared across all invocations of the action
let adminApp: App | null = null;
let resend: Resend | null = null;

function initializeServices() {
  if (!resend) {
    if (process.env.RESEND_API_KEY) {
      resend = new Resend(process.env.RESEND_API_KEY);
    } else {
      console.warn("RESEND_API_KEY is not set. Email sending will be disabled.");
    }
  }

  if (adminApp) {
    return;
  }
  
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
      adminApp = null; // Ensure it's null on failure
    }
  } else if (getApps().length) {
    adminApp = getApps()[0];
  } else {
    console.warn('⚠️ Firebase Admin environment variables are not fully set. Server-side Firebase features may be disabled.');
  }
}

type ContactFormState = {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string[];
  }
}

function getJobTypeFolder(jobType: string): string {
  switch (jobType) {
    case 'Flex Banner':
      return 'flex-banner';
    case 'Self-Adhesive Vinyl (SAV)':
      return 'sav';
    case 'Window / Clear Sticker':
      return 'window-clear-sticker';
    default:
      return 'other';
  }
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  
  initializeServices();

  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    jobType: formData.get('jobType'),
    message: formData.get('message'),
    file: formData.get('file'),
    agreeToTerms: formData.get('agreeToTerms') === 'on',
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed. Please check the fields.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { name, phone, email, jobType, message, file } = validatedFields.data;
  
  const refId = Math.random().toString(36).substring(2, 7).toUpperCase();
  let fileUrl: string | null = null;
  let fileName: string | null = null;
  let fileSize: number | null = null;
  let fileBuffer: Buffer | null = null;

  if (file && file.size > 0) {
    fileName = file.name;
    fileSize = file.size;
    const arrayBuffer = await file.arrayBuffer();
    fileBuffer = Buffer.from(arrayBuffer);

    if (!adminApp) {
      console.error('Firebase Admin is not initialized. Cannot upload file.');
      return { success: false, message: 'Server configuration error: Storage service unavailable.' };
    }

    try {
      const storage = getStorage(adminApp);
      const bucket = storage.bucket();
      const jobTypeFolder = getJobTypeFolder(jobType);
      const filePath = `submissions/${jobTypeFolder}/${refId}-${fileName}`;
      const fileRef = bucket.file(filePath);

      await fileRef.save(fileBuffer, {
        metadata: { contentType: file.type },
      });
      
      await fileRef.makePublic();
      fileUrl = fileRef.publicUrl();

    } catch (storageError: any) {
      console.error(`❌ Failed to upload file:`, storageError);
      return { success: false, message: `Failed to upload file. Please try again.` };
    }
  }

  if (adminApp) {
    try {
      const db = getFirestore(adminApp);
      const submissionData = {
        refId, name, phone,
        email: email || '',
        jobType, message, fileUrl, fileName, fileSize,
        agreeToUpdates: validatedFields.data.agreeToTerms,
        submittedAt: new Date().toISOString(),
      };
      await db.collection('submissions').doc(refId).set(submissionData);
    } catch (firestoreError: any) {
      console.error(`❌ Failed to save submission:`, firestoreError);
      return { success: false, message: `Failed to save your request. Please try again.` };
    }
  }

  if (resend && process.env.RESEND_FROM_EMAIL && process.env.RESEND_TO_EMAIL) {
    try {
      const adminEmailHTML = generateAdminEmailHTML({
        name, phone, email, jobType, message,
        fileName: fileName || undefined,
        fileSize: fileSize || undefined,
        agreeToUpdates: validatedFields.data.agreeToTerms,
      });

      const attachments = fileBuffer && fileName ? [{ filename: fileName, content: fileBuffer }] : [];

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.RESEND_TO_EMAIL,
        subject: `[#${refId}] New Order: ${jobType} - ${name}`,
        html: adminEmailHTML,
        attachments,
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
