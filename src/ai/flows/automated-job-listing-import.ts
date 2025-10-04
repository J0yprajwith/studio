'use server';

/**
 * @fileOverview An AI agent for automatically importing job listings from external job sites.
 *
 * - automatedJobListingImport - A function that handles the job listing import process.
 * - AutomatedJobListingImportInput - The input type for the automatedJobListingImport function.
 * - AutomatedJobListingImportOutput - The return type for the automatedJobListingImport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomatedJobListingImportInputSchema = z.object({
  jobListingText: z
    .string()
    .describe("The text content of a job listing from an external job site."),
});
export type AutomatedJobListingImportInput = z.infer<typeof AutomatedJobListingImportInputSchema>;

const AutomatedJobListingImportOutputSchema = z.object({
  title: z.string().describe('The title of the job listing.'),
  description: z.string().describe('A detailed description of the job.'),
  company: z.string().describe('The name of the company offering the job.'),
  location: z.string().describe('The location of the job (e.g., city, state).'),
  salary: z.string().describe('The salary range or compensation details, if provided.'),
  requirements: z.string().describe('The key skills and qualifications required for the job.'),
  applicationInstructions: z
    .string()
    .describe('Instructions on how to apply for the job.'),
});
export type AutomatedJobListingImportOutput = z.infer<typeof AutomatedJobListingImportOutputSchema>;

export async function automatedJobListingImport(
  input: AutomatedJobListingImportInput
): Promise<AutomatedJobListingImportOutput> {
  return automatedJobListingImportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automatedJobListingImportPrompt',
  input: {schema: AutomatedJobListingImportInputSchema},
  output: {schema: AutomatedJobListingImportOutputSchema},
  prompt: `You are an AI-powered job listing parser. Your task is to extract key
information from the provided job listing text and structure it into a JSON format.

Here is the job listing text:

{{{jobListingText}}}

Extract the following fields:

- title: The title of the job listing.
- description: A detailed description of the job.
- company: The name of the company offering the job.
- location: The location of the job (e.g., city, state).
- salary: The salary range or compensation details, if provided.
- requirements: The key skills and qualifications required for the job.
- applicationInstructions: Instructions on how to apply for the job.

Ensure that the output is a valid JSON object conforming to the
AutomatedJobListingImportOutputSchema.

Output:`,
});

const automatedJobListingImportFlow = ai.defineFlow(
  {
    name: 'automatedJobListingImportFlow',
    inputSchema: AutomatedJobListingImportInputSchema,
    outputSchema: AutomatedJobListingImportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
