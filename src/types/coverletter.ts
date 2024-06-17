import { z } from 'zod';

export interface Coverletter {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const CoverletterSchema = z.object({
  id: z.string(),
  content: z.string(),
});

export function initialCoverletter(): Coverletter {
  return { id: '', content: '', createdAt: '', updatedAt: '' };
}
