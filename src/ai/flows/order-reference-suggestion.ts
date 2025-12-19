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
  Use clear placeholders like [Please specify...].

  Job Type: {{{jobType}}}

  Generate a template that includes fields for:
  - Size (width and height)
  - Quantity
  - Finishing (e.g., eyelets, lamination, etc., if applicable to the job type)
  - Deadline
  - Any other relevant notes.

  Start the message with "Hi, I need a {{{jobType}}}."

  Example for "Flex Banner":
  "Hi, I need a Flex Banner.

  **Size:** [Please specify width and height]
  **Quantity:** [e.g., 1 banner]
  **Finishing:** [e.g., with eyelets]
  **Deadline:** [e.g., by this Friday]

  **Additional Notes:** [Your notes here]"
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
