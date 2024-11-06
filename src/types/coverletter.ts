import { z } from 'zod';

export interface Coverletter {
  id: string;
  name: string;
  content: string;
  resumeId: string;
  jobDescription: string;
  createdAt: string;
  updatedAt: string;
}

export const CoverletterSchema = z.object({
  id: z.string(),
  content: z.string(),
  resumeId: z.string(),
  jobDescription: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export function initialCoverletter(): Coverletter {
  return {
    id: '',
    name: '',
    content: '',
    resumeId: '',
    jobDescription: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
