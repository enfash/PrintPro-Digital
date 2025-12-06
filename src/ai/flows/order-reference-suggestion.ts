'use server';

/**
 * @fileOverview This file implements the Genkit flow for suggesting order reference names based on user input.
 *
 * It defines a flow that takes customer details as input and uses a language model to suggest relevant reference names for their files.
 *
 * @module OrderReferenceSuggestion
 * @exports suggestOrderReference - The main function to trigger the order reference suggestion flow.
 * @exports OrderReferenceSuggestionInput - The input type for the suggestOrderReference function.
 * @exports OrderReferenceSuggestionOutput - The output type for the suggestOrderReference function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OrderReferenceSuggestionInputSchema = z.object({
  customerName: z.string().describe('The name of the customer.'),
  orderDescription: z.string().describe('A description of the order provided by the customer.'),
  additionalNotes: z.string().optional().describe('Any additional notes or details provided by the customer.'),
});
export type OrderReferenceSuggestionInput = z.infer<typeof OrderReferenceSuggestionInputSchema>;

const OrderReferenceSuggestionOutputSchema = z.object({
  suggestedReferenceName: z.string().describe('A suggested reference name for the order files based on the provided details.'),
});
export type OrderReferenceSuggestionOutput = z.infer<typeof OrderReferenceSuggestionOutputSchema>;

export async function suggestOrderReference(input: OrderReferenceSuggestionInput): Promise<OrderReferenceSuggestionOutput> {
  return suggestOrderReferenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'orderReferenceSuggestionPrompt',
  input: {schema: OrderReferenceSuggestionInputSchema},
  output: {schema: OrderReferenceSuggestionOutputSchema},
  prompt: `You are an AI assistant helping to suggest a reference name for a customer's order files.
  The goal is to create a concise and relevant reference that will help in organizing and identifying the files.
  Consider the customer's name, order description, and any additional notes to generate the most appropriate reference name.
  The reference name should be short, descriptive, and easy to understand.

  Customer Name: {{{customerName}}}
  Order Description: {{{orderDescription}}}
  Additional Notes: {{{additionalNotes}}}

  Suggested Reference Name:`,
});

const suggestOrderReferenceFlow = ai.defineFlow(
  {
    name: 'suggestOrderReferenceFlow',
    inputSchema: OrderReferenceSuggestionInputSchema,
    outputSchema: OrderReferenceSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
