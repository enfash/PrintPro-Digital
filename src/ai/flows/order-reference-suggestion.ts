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
  customerDraft: z.string().optional().describe('The draft message the customer has already typed.'),
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
  prompt: `You are an AI assistant for a printing company. Your task is to help a customer write a clear and concise message for their print order.

You will receive the 'Job Type' they selected and an optional 'Customer Draft' of what they have typed so far.

- If 'Customer Draft' is empty or very short, provide a standard template.
- If 'Customer Draft' contains information, refine it into a well-structured message. Incorporate their points and add any missing essential details (like size, quantity) as placeholders.
- The tone should be professional, friendly, and brief.
- Each point in the output MUST be on a new line.

Job Type: {{{jobType}}}
Customer Draft: "{{{customerDraft}}}"

Here are the standard templates to use as a base if the draft is empty:

If the job type is 'Flex Banner' and the draft is empty, you MUST generate the following template exactly as it appears:
"Hi BOMedia, I need a Flex Banner.

Size (width × height):
Quantity:
Need Eyelets?: Yes
Installation needed? (Yes / No):
Deadline:
Delivery location (optional):

Additional notes:"

If the job type is anything other than 'Flex Banner' (e.g., 'Self-Adhesive Vinyl (SAV)') and the draft is empty, you MUST generate the following template exactly as it appears:
"Hi BOMedia, I need a {{{jobType}}}.

Size (width × height):
Quantity:
Installation needed? (Yes / No):
Deadline:
Delivery location (optional):

Additional notes:"

If the customer provides a draft like "I want to print this but I want to make sure it sharp for billboard", you should refine it to something like this (adjusting for the actual job type):
"Hi BOMedia, I need a {{{jobType}}} for a billboard.

It's very important that the print is high-resolution and sharp.

Size (width × height):
Quantity:
Deadline:
Delivery location (optional):"
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
