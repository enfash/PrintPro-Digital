import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Buffer } from 'buffer';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const jobType = formData.get('jobType') as string;
    const message = formData.get('message') as string;
    const agreeToUpdates = formData.get('agreeToUpdates') === 'true';
    const file = formData.get('file') as File | null;

    // Configure Nodemailer Transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_SECURE) === 1,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Prepare email content
    const textMessage = `
Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}
Job Type: ${jobType}
Message: ${message}
Agreed to Updates: ${agreeToUpdates ? 'Yes' : 'No'}
    `;

    const htmlMessage = `
      <h2>New Quote Request from BOMedia Website</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || 'Not provided'}</p>
      <p><strong>Job Type:</strong> ${jobType}</p>
      <p><strong>Message:</strong></p>
      <p style="background-color: #f3f4f6; padding: 10px; border-radius: 4px;">${message.replace(/\n/g, '<br>')}</p>
      <p><strong>Agreed to Updates:</strong> ${agreeToUpdates ? 'Yes' : 'No'}</p>
    `;

    // Handle Attachment
    let attachments = [];
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // Generate a short unique reference ID
    const refId = Math.random().toString(36).substring(2, 7).toUpperCase();

    // Send Mail
    await transporter.sendMail({
      from: `"BOMedia Web" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email || undefined,
      subject: `[#${refId}] New Quote Request: ${jobType} - ${name}`,
      text: textMessage,
      html: htmlMessage,
      attachments: attachments,
    });

    // Optionally send a confirmation email to the customer
    if (email) {
      const customerHtmlMessage = `
        <h2>Thank You for Your Quote Request!</h2>
        <p>Hi ${name},</p>
        <p>We've received your request for a <strong>${jobType}</strong> and will get back to you with a quote shortly.</p>
        <p>Your reference ID is <strong>#${refId}</strong>.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>The BOMedia Team</strong></p>
      `;
      await transporter.sendMail({
        from: `"BOMedia" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Your Quote Request [#${refId}] Has Been Received`,
        html: customerHtmlMessage,
      });
    }


    return NextResponse.json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('Email API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
