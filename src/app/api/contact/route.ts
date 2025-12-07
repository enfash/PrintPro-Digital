import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminStorage } from '@/lib/firebaseAdmin';
import { resend, RESEND_FROM_EMAIL, RESEND_TO_EMAIL } from '@/lib/resend';
import { generateAdminEmailHTML, generateCustomerEmailHTML } from '@/lib/email-template';

export const runtime = 'nodejs';

// Centralized error handler
function handleError(error: any, message: string, status: number = 500) {
    console.error(`❌ API Error: ${message}`, error);
    const errorMessage = error.message || 'An unexpected error occurred.';
    return NextResponse.json({ success: false, error: `${message}: ${errorMessage}` }, { status });
}

export async function POST(request: NextRequest) {
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
    
    const refId = Math.random().toString(36).substring(2, 7).toUpperCase();
    let fileUrl: string | null = null;
    let fileName: string | null = null;
    let fileSize: number | null = null;
    let fileBuffer: Buffer | null = null;

    if (file) {
        fileName = file.name;
        fileSize = file.size;
        const arrayBuffer = await file.arrayBuffer();
        fileBuffer = Buffer.from(arrayBuffer);
    }
    

    // --- 2. Upload File to Firebase Storage (if it exists) ---
    if (fileBuffer && fileName) {
        try {
            const bucket = adminStorage.bucket();
            const filePath = `submissions/${refId}/${fileName}`;
            const fileRef = bucket.file(filePath);

            await fileRef.save(fileBuffer, {
                metadata: { contentType: file.type },
            });
            
            // Make the file public and get the URL
            await fileRef.makePublic();
            fileUrl = fileRef.publicUrl();

        } catch (storageError) {
            return handleError(storageError, 'Failed to upload file');
        }
    }

    // --- 3. Save Submission to Firestore ---
    try {
        const submissionData = {
            refId,
            name,
            phone,
            email,
            jobType,
            message,
            fileUrl,
            fileName,
            fileSize,
            agreeToUpdates,
            submittedAt: new Date().toISOString(),
        };
        await adminDb.collection('submissions').add(submissionData);
    } catch (firestoreError) => {
        return handleError(firestoreError, 'Failed to save submission');
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
                subject: `Order Received [#${refId}] - PrintPro Digital`,
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
