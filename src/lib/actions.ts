
'use server';

import { adminDb, adminStorage } from '@/lib/firebaseAdmin';
import { resend, RESEND_FROM_EMAIL, RESEND_TO_EMAIL } from '@/lib/resend';
import { generateAdminEmailHTML, generateCustomerEmailHTML } from '@/lib/email-template';
import { ContactFormSchema } from '@/lib/schema';
import { z } from 'zod';

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

    // --- Upload File to Firebase Storage ---
    if (!adminStorage) {
      console.error('Firebase Admin Storage is not initialized.');
      return { success: false, message: 'Server configuration error: Storage service unavailable.' };
    }

    try {
      const bucket = adminStorage.bucket();
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
      return { success: false, message: `Failed to upload file: ${storageError.message}` };
    }
  }

  // --- Save Submission to Firestore ---
  if (!adminDb) {
    console.error('Firebase Admin Firestore is not initialized.');
    return { success: false, message: 'Server configuration error: Database service unavailable.' };
  }

  try {
    const submissionData = {
      refId,
      name,
      phone,
      email: email || '',
      jobType,
      message,
      fileUrl,
      fileName,
      fileSize,
      agreeToUpdates: validatedFields.data.agreeToTerms,
      submittedAt: new Date().toISOString(),
    };
    await adminDb.collection('submissions').doc(refId).set(submissionData);
  } catch (firestoreError: any) {
    console.error(`❌ Failed to save submission:`, firestoreError);
    return { success: false, message: `Failed to save submission: ${firestoreError.message}` };
  }

  // --- Send Emails ---
  try {
    const adminEmailHTML = generateAdminEmailHTML({
      name, phone, email, jobType, message,
      fileName: fileName || undefined,
      fileSize: fileSize || undefined,
      agreeToUpdates: validatedFields.data.agreeToTerms,
    });

    const attachments = fileBuffer && fileName
      ? [{ filename: fileName, content: fileBuffer }]
      : [];

    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: RESEND_TO_EMAIL,
      subject: `[#${refId}] New Order: ${jobType} - ${name}`,
      html: adminEmailHTML,
      attachments,
    });

    if (email) {
      const customerEmailHTML = generateCustomerEmailHTML(name, jobType);
      await resend.emails.send({
        from: RESEND_FROM_EMAIL,
        to: email,
        subject: `Order Received [#${refId}] - PrintPro Digital`,
        html: customerEmailHTML,
      });
    }
  } catch (emailError: any) {
    console.warn('⚠️ Submission saved, but email sending failed.', emailError);
    // Don't block the success response if emails fail, just log it.
  }

  return { success: true, message: 'Order received successfully!' };
}
