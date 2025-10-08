'use server';
/**
 * @fileOverview Provides a summary of uploaded content.
 *
 * - summarizeUploadedContent - A function that summarizes the content.
 * - SummarizeUploadedContentInput - The input type for the summarizeUploadedContent function.
 * - SummarizeUploadedContentOutput - The return type for the summarizeUploadedContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUploadedContentInputSchema = z.object({
  content: z
    .string()
    .describe('The content to summarize.  This is text extracted via OCR from a document.'),
  language: z.enum(['urdu', 'english']).describe('The language of the content.'),
});
export type SummarizeUploadedContentInput = z.infer<typeof SummarizeUploadedContentInputSchema>;

const SummarizeUploadedContentOutputSchema = z.object({
  summary: z.string().describe('The summary of the content.'),
});
export type SummarizeUploadedContentOutput = z.infer<typeof SummarizeUploadedContentOutputSchema>;

export async function summarizeUploadedContent(
  input: SummarizeUploadedContentInput
): Promise<SummarizeUploadedContentOutput> {
  return summarizeUploadedContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeUploadedContentPrompt',
  input: {schema: SummarizeUploadedContentInputSchema},
  output: {schema: SummarizeUploadedContentOutputSchema},
  prompt: `You are a helpful assistant that summarizes text content for students.

  Summarize the following content in the specified language.

  Language: {{{language}}}
  Content: {{{content}}}
  `,
});

const summarizeUploadedContentFlow = ai.defineFlow(
  {
    name: 'summarizeUploadedContentFlow',
    inputSchema: SummarizeUploadedContentInputSchema,
    outputSchema: SummarizeUploadedContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
