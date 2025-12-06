import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminStorage } from '../../../lib/firebaseAdmin';
import { resend, RESEND_FROM, RESEND_TO } from '../../../lib/resend';
import { generateAdminEmailHTML, generateCustomerEmailHTML } from '../../../lib/emailTemplate';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        // Parse form data
        const formData = await request.formData();

        const name = formData.get('name') as string;
        const phone = formData.get('phone') as string;
        const email = formData.get('email') as string || '';
        const jobType = formData.get('jobType') as string;
        const message = formData.get('message') as string;
        const agreeToUpdates = formData.get('agreeToUpdates') === 'true';
        const file = formData.get('file') as File | null;

        // Validate required fields
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

        // Handle file upload to Firebase Storage
        if (file) {
            try {
                fileName = file.name;
                fileSize = file.size;

                // Convert file to buffer
                const arrayBuffer = await file.arrayBuffer();
                fileBuffer = Buffer.from(arrayBuffer);

                // Upload to Firebase Storage
                const bucket = adminStorage.bucket();
                const timestamp = Date.now();
                const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
                const storagePath = `submissions/${timestamp}_${sanitizedFileName}`;

                const fileUpload = bucket.file(storagePath);

                await fileUpload.save(fileBuffer, {
                    metadata: {
                        contentType: file.type,
                    },
                });

                // Make file publicly accessible
                await fileUpload.makePublic();

                // Get public URL
                fileUrl = `https://storage.googleapis.com/${bucket.name}/${storagePath}`;
            } catch (uploadError: any) {
                console.error('File upload error:', uploadError);
                return NextResponse.json(
                    { success: false, error: 'Failed to upload file' },
                    { status: 500 }
                );
            }
        }

        // Generate a short unique reference ID
        const refId = Math.random().toString(36).substring(2, 7).toUpperCase();

        // Save to Firestore
        try {
            const submissionData = {
                refId, // Save refId
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

            const docRef = await adminDb.collection('submissions').add(submissionData);
            console.log(`✅ Submission saved to Firestore: ${docRef.id} [${refId}]`);
        } catch (dbError: any) {
            console.error('Firestore error:', dbError);
            return NextResponse.json(
                { success: false, error: 'Failed to save submission' },
                { status: 500 }
            );
        }

        // Send emails via Resend
        try {
            const adminEmailHTML = generateAdminEmailHTML({
                name,
                phone,
                email,
                jobType,
                message,
                fileName: fileName || undefined,
                fileSize: fileSize || undefined,
                agreeToUpdates,
            });

            // Prepare attachments for admin email
            const attachments = fileBuffer && fileName
                ? [{
                    filename: fileName,
                    content: fileBuffer,
                }]
                : [];

            // Send admin notification
            await resend.emails.send({
                from: RESEND_FROM,
                to: RESEND_TO,
                subject: `[#${refId}] New Order: ${jobType} - ${name}`,
                html: adminEmailHTML,
                attachments,
            });

            console.log('✅ Admin email sent');

            // Send customer confirmation (if email provided)
            if (email) {
                const customerEmailHTML = generateCustomerEmailHTML(name, jobType);

                await resend.emails.send({
                    from: RESEND_FROM,
                    to: email,
                    subject: `Order Received [#${refId}] - BOMedia`,
                    html: customerEmailHTML,
                });

                console.log('✅ Customer confirmation sent');
            }
        } catch (emailError: any) {
            console.error('Email sending error:', emailError);
            // Don't fail the request if email fails - data is already saved
            console.warn('⚠️ Email failed but submission was saved');
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
