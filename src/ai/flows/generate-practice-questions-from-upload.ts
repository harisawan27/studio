'use server';
/**
 * @fileOverview Generates practice questions from uploaded content using the Gemini API.
 *
 * - generatePracticeQuestions - A function that takes uploaded content and generates practice questions.
 * - GeneratePracticeQuestionsInput - The input type for the generatePracticeQuestions function.
 * - GeneratePracticeQuestionsOutput - The return type for the generatePracticeQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePracticeQuestionsInputSchema = z.object({
  content: z
    .string()
    .describe("The content extracted from the uploaded document."),
  language: z.enum(['Urdu', 'English']).describe('The language to generate the questions in.'),
});
export type GeneratePracticeQuestionsInput = z.infer<typeof GeneratePracticeQuestionsInputSchema>;

const GeneratePracticeQuestionsOutputSchema = z.object({
  questions: z.array(z.string()).describe('The generated practice questions.'),
});
export type GeneratePracticeQuestionsOutput = z.infer<typeof GeneratePracticeQuestionsOutputSchema>;

export async function generatePracticeQuestions(
  input: GeneratePracticeQuestionsInput
): Promise<GeneratePracticeQuestionsOutput> {
  return generatePracticeQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePracticeQuestionsPrompt',
  input: {schema: GeneratePracticeQuestionsInputSchema},
  output: {schema: GeneratePracticeQuestionsOutputSchema},
  prompt: `You are an expert educator, skilled at generating practice questions for students.

  Based on the following content, generate a set of practice questions in the specified language.

  Content:
  {{content}}

  Language: {{language}}

  Please provide a variety of question types, including multiple choice, short answer, and true/false, if appropriate for the content.
  Your goal is to help students test their knowledge and prepare for exams.
  Format your response as a JSON array of strings.
  `,
});

const generatePracticeQuestionsFlow = ai.defineFlow(
  {
    name: 'generatePracticeQuestionsFlow',
    inputSchema: GeneratePracticeQuestionsInputSchema,
    outputSchema: GeneratePracticeQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
