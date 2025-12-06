import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminStorage } from '@/lib/firebaseAdmin';
import { resend, RESEND_FROM_EMAIL, RESEND_TO_EMAIL } from '@/lib/resend';
import { generateAdminEmailHTML, generateCustomerEmailHTML } from '@/lib/email-template';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

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

        // Handle file upload
        if (file) {
            try {
                fileName = file.name;
                fileSize = file.size;
                const arrayBuffer = await file.arrayBuffer();
                fileBuffer = Buffer.from(arrayBuffer);

                // 1. Explicitly get the bucket (Best Practice: Use your env var here if the default isn't set)
                // If this fails, ensure your initialized app in lib/firebaseAdmin has 'storageBucket' defined.
                const bucket = adminStorage.bucket(); 
                
                const timestamp = Date.now();
                const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
                const storagePath = `submissions/${timestamp}_${sanitizedFileName}`;
                const fileUpload = bucket.file(storagePath);

                // 2. Save file
                await fileUpload.save(fileBuffer, {
                    metadata: { contentType: file.type },
                });

                // 3. FIXED: Generate a long-lived Signed URL instead of makePublic()
                // This bypasses the "Uniform Bucket Level Access" error
                const [signedUrl] = await fileUpload.getSignedUrl({
                    action: 'read',
                    expires: '01-01-2030', // Set a long expiration date
                });

                fileUrl = signedUrl;

            } catch (uploadError: any) {
                console.error('File upload error detailed:', uploadError);
                // Return the ACTUAL error message to the client for debugging
                return NextResponse.json(
                    { success: false, error: `Upload failed: ${uploadError.message}` },
                    { status: 500 }
                );
            }
        }

        // Generate ID
        const refId = Math.random().toString(36).substring(2, 7).toUpperCase();

        // Save to Firestore
        try {
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

            await adminDb.collection('submissions').add(submissionData);
        } catch (dbError: any) {
            console.error('Firestore error:', dbError);
            return NextResponse.json(
                { success: false, error: 'Failed to save submission' },
                { status: 500 }
            );
        }

        // Emails (Resend)
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
            console.error('Email sending error:', emailError);
        }

        return NextResponse.json({
            success: true,
            message: 'Order received successfully',
        });

    } catch (error: any) {
        console.error('❌ API error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}
