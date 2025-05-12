'use server';

/**
 * @fileOverview AI-powered tool to refine project descriptions.
 *
 * - refineDescription - A function that refines project descriptions based on user preferences.
 * - RefineDescriptionInput - The input type for the refineDescription function.
 * - RefineDescriptionOutput - The return type for the refineDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineDescriptionInputSchema = z.object({
  description: z.string().describe('The project description to refine.'),
  tonePreferences: z.string().describe('Specific tone preferences for the refined description (e.g., professional, casual, formal).'),
});
export type RefineDescriptionInput = z.infer<typeof RefineDescriptionInputSchema>;

const RefineDescriptionOutputSchema = z.object({
  refinedDescription: z.string().describe('The refined project description with improved tone, clarity, and overall quality.'),
});
export type RefineDescriptionOutput = z.infer<typeof RefineDescriptionOutputSchema>;

export async function refineDescription(input: RefineDescriptionInput): Promise<RefineDescriptionOutput> {
  return refineDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineDescriptionPrompt',
  input: {schema: RefineDescriptionInputSchema},
  output: {schema: RefineDescriptionOutputSchema},
  prompt: `Refine the following project description based on the specified tone preferences. Ensure the refined description has improved tone, clarity and overall quality.\n\nDescription: {{{description}}}\nTone Preferences: {{{tonePreferences}}}`,
});

const refineDescriptionFlow = ai.defineFlow(
  {
    name: 'refineDescriptionFlow',
    inputSchema: RefineDescriptionInputSchema,
    outputSchema: RefineDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
