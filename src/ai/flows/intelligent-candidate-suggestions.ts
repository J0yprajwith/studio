'use server';

/**
 * @fileOverview A Genkit flow for intelligent candidate suggestions based on job descriptions and candidate profiles.
 *
 * - suggestCandidates - A function that suggests relevant candidates for a given job description.
 * - SuggestCandidatesInput - The input type for the suggestCandidates function.
 * - SuggestCandidatesOutput - The return type for the suggestCandidates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCandidatesInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The detailed description of the job opening.'),
  candidateProfiles: z
    .array(z.string())
    .describe(
      'An array of candidate profiles, with each profile described as a string.'
    ),
});
export type SuggestCandidatesInput = z.infer<typeof SuggestCandidatesInputSchema>;

const SuggestCandidatesOutputSchema = z.object({
  suggestedCandidates: z
    .array(z.string())
    .describe(
      'An array of candidate identifiers, ranked by relevance to the job description.'
    ),
  reasoning: z
    .string()
    .describe(
      'A detailed explanation of how the candidates were selected and ranked.'
    ),
});
export type SuggestCandidatesOutput = z.infer<typeof SuggestCandidatesOutputSchema>;

export async function suggestCandidates(
  input: SuggestCandidatesInput
): Promise<SuggestCandidatesOutput> {
  return suggestCandidatesFlow(input);
}

const suggestCandidatesPrompt = ai.definePrompt({
  name: 'suggestCandidatesPrompt',
  input: {schema: SuggestCandidatesInputSchema},
  output: {schema: SuggestCandidatesOutputSchema},
  prompt: `You are an expert recruiter tasked with identifying the best candidates for a given job description.

Analyze the following job description and candidate profiles to suggest the most relevant candidates.

Job Description: {{{jobDescription}}}

Candidate Profiles:
{{#each candidateProfiles}}
- {{{this}}}
{{/each}}

Based on your analysis, provide a ranked list of candidate identifiers and a detailed explanation of your reasoning.

Output the candidate suggestions as a ranked list of identifiers, and include detailed reasoning for each suggested candidate.
`,
});

const suggestCandidatesFlow = ai.defineFlow(
  {
    name: 'suggestCandidatesFlow',
    inputSchema: SuggestCandidatesInputSchema,
    outputSchema: SuggestCandidatesOutputSchema,
  },
  async input => {
    const {output} = await suggestCandidatesPrompt(input);
    return output!;
  }
);
