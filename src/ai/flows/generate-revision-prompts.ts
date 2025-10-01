'use server';

/**
 * @fileOverview Generates revision prompts for a given text.
 *
 * - generateRevisionPrompts - A function that generates revision prompts based on the provided text.
 * - GenerateRevisionPromptsInput - The input type for the generateRevisionPrompts function.
 * - GenerateRevisionPromptsOutput - The return type for the generateRevisionPrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRevisionPromptsInputSchema = z.object({
  text: z.string().describe('The text content to generate revision prompts from.'),
});
export type GenerateRevisionPromptsInput = z.infer<typeof GenerateRevisionPromptsInputSchema>;

const GenerateRevisionPromptsOutputSchema = z.object({
  revisionPrompts: z.array(z.string()).describe('An array of revision prompts generated from the text.'),
});
export type GenerateRevisionPromptsOutput = z.infer<typeof GenerateRevisionPromptsOutputSchema>;

export async function generateRevisionPrompts(input: GenerateRevisionPromptsInput): Promise<GenerateRevisionPromptsOutput> {
  return generateRevisionPromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRevisionPromptsPrompt',
  input: {schema: GenerateRevisionPromptsInputSchema},
  output: {schema: GenerateRevisionPromptsOutputSchema},
  prompt: `You are an AI assistant designed to generate revision prompts for students.

  Generate a list of revision prompts based on the following text content. The revision prompts should encourage active recall and reinforcement of understanding.

  Text Content:
  {{text}}
  `,
});

const generateRevisionPromptsFlow = ai.defineFlow(
  {
    name: 'generateRevisionPromptsFlow',
    inputSchema: GenerateRevisionPromptsInputSchema,
    outputSchema: GenerateRevisionPromptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
