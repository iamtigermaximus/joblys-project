import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { Resume } from './resume';
export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: { month: string; year: string };
  endDate: { month: string; year: string };
  jobDetails: string;
}

export type DateInfo = {
  month: string;
  year: string;
};

export type Education = {
  id: string;
  school: string;
  course: string;
  startDate: DateInfo;
  endDate: DateInfo;
  description?: string;
};

export interface Language {
  id: string;
  name: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Link {
  id: string;
  url: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  links: Link[];
  educational: Education[];
  professional: WorkExperience[];
  skills: Skill[];
  languages: Language[];
}

export const ProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  contact: z.string(),
  links: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
    }),
  ),
  educational: z.array(
    z.object({
      id: z.string(),
      school: z.string(),
      course: z.string(),
      startDate: z.object({ month: z.string(), year: z.string() }),
      endDate: z.object({ month: z.string(), year: z.string() }),
      description: z.string(),
    }),
  ),
  professional: z.array(
    z.object({
      id: z.string(),
      jobTitle: z.string(),
      company: z.string(),
      startDate: z.object({ month: z.string(), year: z.string() }),
      endDate: z.object({ month: z.string(), year: z.string() }),
      jobDetails: z.string(),
    }),
  ),

  skills: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
  languages: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
});

export function convertProfileToResume(profile: Profile): Resume {
  return {
    id: uuidv4(),
    basic: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phoneNumber: profile.contact,
      address: '',
      linkedin: '',
      additionalLinks: profile.links,
    },
    professional: {
      summary: '',
      currentRole: '',
      work: profile.professional,
    },
    educational: profile.educational,
    skills: profile.skills,
    languages: profile.languages,
  };
}
