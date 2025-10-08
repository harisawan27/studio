'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating simple explanations of textbook content in Urdu or English.
 *
 * - generateExplanations - A function that takes textbook content and generates explanations.
 * - GenerateExplanationsInput - The input type for the generateExplanations function.
 * - GenerateExplanationsOutput - The return type for the generateExplanations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExplanationsInputSchema = z.object({
  textbookContent: z
    .string()
    .describe('The content extracted from the textbook page.'),
  language: z.enum(['Urdu', 'English']).describe('The desired language for the explanations.'),
});

export type GenerateExplanationsInput = z.infer<typeof GenerateExplanationsInputSchema>;

const GenerateExplanationsOutputSchema = z.object({
  explanations: z
    .string()
    .describe('Simple explanations of the textbook content in the specified language.'),
});

export type GenerateExplanationsOutput = z.infer<typeof GenerateExplanationsOutputSchema>;

export async function generateExplanations(
  input: GenerateExplanationsInput
): Promise<GenerateExplanationsOutput> {
  return generateExplanationsFlow(input);
}

const generateExplanationsPrompt = ai.definePrompt({
  name: 'generateExplanationsPrompt',
  input: {schema: GenerateExplanationsInputSchema},
  output: {schema: GenerateExplanationsOutputSchema},
  prompt: `You are an expert tutor specializing in explaining complex topics in simple terms.

  Please provide simple explanations of the following textbook content in {{{language}}}. Be concise and use language that is easy for students to understand.

  Textbook Content:
  {{{
    textbookContent
  }}}
`,
});

const generateExplanationsFlow = ai.defineFlow(
  {
    name: 'generateExplanationsFlow',
    inputSchema: GenerateExplanationsInputSchema,
    outputSchema: GenerateExplanationsOutputSchema,
  },
  async input => {
    const {output} = await generateExplanationsPrompt(input);
    return output!;
  }
);
