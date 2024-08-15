import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

export interface AdditionalLinkType {
  id: string;
  url: string;
}
export interface BasicInfoType {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  linkedin: string;
  additionalLinks: AdditionalLinkType[];
}

export type DateType = {
  month: string;
  year: string;
};

export type PresentEndDateType = {
  month: 'present';
  year: '';
};

export type EndDateType = DateType | PresentEndDateType;

export interface ProfessionalExperienceType {
  id: string;
  jobTitle: string;
  company: string;
  startDate: DateType;
  endDate: EndDateType;
  jobDetails: string;
}

export interface EducationType {
  id: string;
  school: string;
  course: string;
  startDate: DateType;
  endDate: DateType;
  description?: string;
}

export interface SkillType {
  id: string;
  name: string;
}

export interface LanguageType {
  id: string;
  name: string;
}

export interface Resume {
  id: string;
  basic: BasicInfoType;
  professional: {
    summary: string;
    currentRole: string;
    work: ProfessionalExperienceType[];
  };
  educational: EducationType[];
  skills: SkillType[];
  languages: LanguageType[];
}

const MonthYearObject = z.object({
  month: z.string(),
  year: z.string(),
});

export const ResumeSchema = z.object({
  basic: z.object({
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    email: z.string(),
    address: z.string(),
    linkedin: z.string(),
    additionalLinks: z.array(
      z.object({
        id: z.string(),
        url: z.string(),
      }),
    ),
  }),
  professional: z.object({
    summary: z.string(),
    currentRole: z.string(),
    work: z.array(
      z.object({
        id: z.string(),
        jobTitle: z.string(),
        company: z.string(),
        startDate: z.object({ month: z.string(), year: z.string() }),
        endDate: z.union([MonthYearObject, z.string()]),
        jobDetails: z.string(),
      }),
    ),
  }),
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

export function initialResume(): Resume {
  const basicInfo: BasicInfoType = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    linkedin: '',
    additionalLinks: [],
  };

  const professionalExperience: ProfessionalExperienceType[] = [
    {
      id: uuidv4(),
      jobTitle: '',
      company: '',
      startDate: { month: '', year: '' },
      endDate: { month: '', year: '' },
      jobDetails: '',
    },
  ];

  const education: EducationType[] = [
    {
      id: uuidv4(),
      school: '',
      course: '',
      startDate: { month: '', year: '' },
      endDate: { month: '', year: '' },
      description: '',
    },
  ];

  const skills: SkillType[] = [
    {
      id: uuidv4(),
      name: '',
    },
  ];

  const languages: LanguageType[] = [
    {
      id: uuidv4(),
      name: '',
    },
  ];

  const resume: Resume = {
    id: uuidv4(),
    basic: basicInfo,
    professional: {
      summary: '',
      currentRole: '',
      work: professionalExperience,
    },
    educational: education,
    skills: skills,
    languages: languages,
  };

  return resume;
}
