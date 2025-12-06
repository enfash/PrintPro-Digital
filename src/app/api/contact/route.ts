
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateAdminEmailHTML, generateCustomerEmailHTML } from '@/lib/email-templates';
import { EMAIL_DISPLAY } from '@/lib/constants';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = 'BOMedia <noreply@bomedia.ng>'; // Must be a verified domain in Resend

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string | null;
    const jobType = formData.get('jobType') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;
    
    // In a real app, you would have already handled the file upload and DB submission
    // in the component. Here, we focus on sending the email.
    
    // 1. Send email to admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: EMAIL_DISPLAY,
      subject: `New Print Order: ${name} - ${jobType}`,
      html: generateAdminEmailHTML({
        name,
        phone,
        email: email || 'Not provided',
        jobType,
        message,
        fileName: file?.name,
        fileSize: file?.size,
        agreeToUpdates: true, // Assuming this from form
      }),
    });

    // 2. Send confirmation email to customer if email is provided
    if (email) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Your Print Order with BOMedia has been received!',
        html: generateCustomerEmailHTML(name, jobType),
      });
    }

    return NextResponse.json({ success: true, message: 'Form submitted and emails sent successfully.' });

  } catch (error) {
    console.error('API Error:', error);
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    // Check for Resend-specific errors
    if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as { message: string }).message;
    }
    return NextResponse.json({ success: false, error: 'Failed to send email.', details: errorMessage }, { status: 500 });
  }
}
