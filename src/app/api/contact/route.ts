import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminStorage } from '@/lib/firebaseAdmin';
import { resend, RESEND_FROM_EMAIL, RESEND_TO_EMAIL } from '@/lib/resend';
import { generateAdminEmailHTML, generateCustomerEmailHTML } from '@/lib/email-template';

export const runtime = 'nodejs';

// Centralized error handler
function handleError(error: any, message: string, status: number = 500) {
    console.error(`❌ API Error: ${message}`, error);
    // In development, you might want to send back the full error
    const errorMessage = error.message || 'An unexpected error occurred.';
    return NextResponse.json({ success: false, error: `${message}: ${errorMessage}` }, { status });
}

export async function POST(request: NextRequest) {
    
    if (!adminDb || !adminStorage) {
        return handleError(new Error('Firebase Admin not initialized.'), 'Server configuration error');
    }

    const formData = await request.formData();

    // --- 1. Extract and Validate Data ---
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string || '';
    const jobType = formData.get('jobType') as string;
    const message = formData.get('message') as string;
    const agreeToUpdates = formData.get('agreeToUpdates') === 'true';
    const file = formData.get('file') as File | null;

    if (!name || !phone || !jobType || !message) {
        return NextResponse.json(
            { success: false, error: 'Missing required fields' },
            { status: 400 }
        );
    }

    let fileUrl: string | null = null;
    let fileName: string | null = null;
    let fileSize: number | null = null;
    let fileBuffer: Buffer | null = null;

    // --- 2. Handle File Upload ---
    if (file) {
        try {
            fileName = file.name;
            fileSize = file.size;
            const arrayBuffer = await file.arrayBuffer();
            fileBuffer = Buffer.from(arrayBuffer);
            
            const bucket = adminStorage.bucket();
            const timestamp = Date.now();
            const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
            const storagePath = `submissions/${timestamp}_${sanitizedFileName}`;
            const fileUpload = bucket.file(storagePath);

            await fileUpload.save(fileBuffer, {
                metadata: { contentType: file.type },
            });

            const [signedUrl] = await fileUpload.getSignedUrl({
                action: 'read',
                expires: '01-01-2030', // Long-lived URL
            });
            fileUrl = signedUrl;

        } catch (uploadError: any) {
            return handleError(uploadError, 'Failed to upload file');
        }
    }

    // --- 3. Save to Firestore ---
    const refId = Math.random().toString(36).substring(2, 7).toUpperCase();
    const submissionData = {
        refId,
        name,
        phone,
        email,
        jobType,
        message,
        agreeToUpdates,
        fileUrl,
        fileName,
        fileSize,
        createdAt: new Date().toISOString(),
        status: 'new',
    };

    try {
        await adminDb.collection('submissions').add(submissionData);
    } catch (dbError: any) {
        return handleError(dbError, 'Failed to save submission');
    }

    // --- 4. Send Emails (with graceful failure) ---
    try {
        const adminEmailHTML = generateAdminEmailHTML({
            name, phone, email, jobType, message,
            fileName: fileName || undefined,
            fileSize: fileSize || undefined,
            agreeToUpdates,
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
                subject: `Order Received [#${refId}] - BOMedia`,
                html: customerEmailHTML,
            });
        }
    } catch (emailError: any) {
        // Don't block the success response if emails fail, just log it.
        console.warn('⚠️ Email sending failed, but submission was saved.', emailError);
    }

    // --- 5. Return Success ---
    return NextResponse.json({
        success: true,
        message: 'Order received successfully',
    });
}
