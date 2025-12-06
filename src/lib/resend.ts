import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set');
}
if (!process.env.RESEND_FROM_EMAIL) {
    throw new Error('RESEND_FROM_EMAIL environment variable is not set');
}
if (!process.env.RESEND_TO_EMAIL) {
    throw new Error('RESEND_TO_EMAIL environment variable is not set');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const RESEND_FROM = process.env.RESEND_FROM_EMAIL;
export const RESEND_TO = process.env.RESEND_TO_EMAIL;
