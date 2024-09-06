import { z } from 'zod';

export interface Coverletter {
  id: string;
  content: string;
  jobDescription: string;
  resumeId: string;
  createdAt: string;
  updatedAt: string;
}

export const CoverletterSchema = z.object({
  id: z.string(),
  content: z.string(),
  jobDescription: z.string(),
  resumeId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export function initialCoverletter(): Coverletter {
  return {
    id: '',
    content: '',
    jobDescription: '',
    resumeId: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
