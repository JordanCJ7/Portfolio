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
import { rateLimiterService } from '@/services/rate-limiter';

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
  // Check rate limit before calling the flow
  // Using global limit for now as there's no user authentication system
  const rateLimitCheck = await rateLimiterService.checkRateLimit(); 
  if (!rateLimitCheck.allowed) {
    // Throw an error that can be caught by the client-side form handler
    throw new Error(rateLimitCheck.message);
  }
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
    // The rate limit check is performed in the exported wrapper function `refineDescription`
    const {output} = await prompt(input);
    return output!;
  }
);
