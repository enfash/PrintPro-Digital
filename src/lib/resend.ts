import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL as string;
export const RESEND_TO_EMAIL = process.env.RESEND_TO_EMAIL as string;
