'use server';

/**
 * @fileOverview This file implements the Genkit flow for suggesting a message template for an order based on the job type.
 *
 * @module OrderTemplateSuggestion
 * @exports suggestOrderTemplate - The main function to trigger the order template suggestion flow.
 * @exports OrderTemplateSuggestionInput - The input type for the suggestOrderTemplate function.
 * @exports OrderTemplateSuggestionOutput - The output type for the suggestOrderTemplate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OrderTemplateSuggestionInputSchema = z.object({
  jobType: z.string().describe('The type of print job the customer selected.'),
});
export type OrderTemplateSuggestionInput = z.infer<typeof OrderTemplateSuggestionInputSchema>;

const OrderTemplateSuggestionOutputSchema = z.object({
  suggestedTemplate: z.string().describe('A suggested message template for the customer to use, with placeholders for them to fill in.'),
});
export type OrderTemplateSuggestionOutput = z.infer<typeof OrderTemplateSuggestionOutputSchema>;

export async function suggestOrderTemplate(input: OrderTemplateSuggestionInput): Promise<OrderTemplateSuggestionOutput> {
  return suggestOrderTemplateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'orderTemplateSuggestionPrompt',
  input: {schema: OrderTemplateSuggestionInputSchema},
  output: {schema: OrderTemplateSuggestionOutputSchema},
  prompt: `You are an AI assistant for a printing company. Your task is to generate a helpful message template for a customer based on the job type they have selected.
  The template should guide the user to provide all the necessary information for an accurate price quote.

  Job Type: {{{jobType}}}

  Generate a template that includes fields for:
  - Size (width × height)
  - Quantity
  - Installation needed? (Yes / No)
  - Deadline
  - Delivery location (optional)
  - Additional notes

  If the job type is 'Flex Banner', you MUST also include a line "Need Eyelets?: Yes" because this is a very common requirement for banners. For all other job types, DO NOT include the eyelets line.

  Start the message with "Hi, I need a {{{jobType}}}."

  Example for "Flex Banner":
"Hi, I need a Flex Banner.

Size (width × height):
Quantity:
Need Eyelets?: Yes
Installation needed? (Yes / No):
Deadline:
Delivery location (optional):

Additional notes:"

Example for "Self-Adhesive Vinyl (SAV)":
"Hi, I need a Self-Adhesive Vinyl (SAV).

Size (width × height):
Quantity:
Installation needed? (Yes / No):
Deadline:
Delivery location (optional):

Additional notes:"
  `,
});

const suggestOrderTemplateFlow = ai.defineFlow(
  {
    name: 'suggestOrderTemplateFlow',
    inputSchema: OrderTemplateSuggestionInputSchema,
    outputSchema: OrderTemplateSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
