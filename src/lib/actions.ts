
'use server';

import { z } from 'zod';
import { suggestOrderReference as suggestOrderReferenceFlow, type OrderReferenceSuggestionInput } from '@/ai/flows/order-reference-suggestion';
import { contactFormSchema } from './schema';

// This is the shape of the state that will be returned from the server action
// It can be used to show messages to the user or to pre-fill the form with the previously entered values
export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
} | null;


export async function getSuggestedReference(data: { customerName: string; orderDescription: string }): Promise<{ suggestion?: string; error?: string }> {
  const { customerName, orderDescription } = data;

  if (!customerName || !orderDescription || customerName.length < 2 || orderDescription.length < 10) {
    return { error: 'Please fill out your name and a brief description first.' };
  }

  try {
    const input: OrderReferenceSuggestionInput = {
      customerName,
      orderDescription,
    };
    const result = await suggestOrderReferenceFlow(input);
    return { suggestion: result.suggestedReferenceName };
  } catch (error) {
    console.error('AI suggestion failed:', error);
    return { error: 'Failed to generate suggestion. Please try again.' };
  }
}

export async function handleFormSubmission(prevState: FormState, formData: FormData): Promise<FormState> {
  const rawData = Object.fromEntries(formData.entries());
  
  const file = formData.get('file') as File | null;
  const dataToValidate = {
    ...rawData,
    file: file && file.size > 0 ? file : undefined,
  };

  const validatedFields = contactFormSchema.safeParse(dataToValidate);

  if (!validatedFields.success) {
    const { fieldErrors } = validatedFields.error.flatten();
    return {
      message: 'Please fix the errors below.',
      fields: rawData as Record<string, string>,
      issues: validatedFields.error.issues.map(issue => `${issue.path.join('.')} : ${issue.message}`),
    };
  }

  try {
    const { customerName } = validatedFields.data;
    const uniqueId = `#${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Here you would implement your backend logic:
    // 1. Upload the file to Firebase Storage if it exists
    //    const filePath = `submissions/${validatedFields.data.category}/${Date.now()}_${file.name}`;
    //    // ... upload logic ...

    // 2. Save submission data to Firestore
    //    const submissionData = { ...validatedFields.data, orderId: uniqueId, fileUrl: '...', timestamp: new Date() };
    //    // ... firestore.collection('submissions').add(submissionData) ...

    // 3. Send email notifications via Resend API
    //    - To admin: with customer details and WhatsApp link.
    //    - To customer: a confirmation email.
    //    // ... email sending logic ...

    console.log('Form submitted successfully:', { ...validatedFields.data, orderId: uniqueId });
    
    return { message: `Thank you, ${customerName}! Your quote request (ID: ${uniqueId}) has been submitted. We'll contact you shortly.` };
  } catch (error) {
    console.error('Form submission error:', error);
    return { message: 'An unexpected error occurred on the server. Please try again later.' };
  }
}
