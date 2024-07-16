import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import {
  AdditionalLinkType,
  BasicInfoType,
  EducationType,
  LanguageType,
  ProfessionalExperienceType,
  Resume,
  SkillType,
} from './resume';
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

// export function convertResumeToProfile(resume: Resume): Profile {
//   return {
//     firstName: resume.basic.firstName,
//     lastName: resume.basic.lastName,
//     email: resume.basic.email,
//     contact: resume.basic.phoneNumber,
//     links: resume.basic.additionalLinks.map(link => ({
//       id: link.id,
//       url: link.url,
//     })),
//     educational: resume.educational.map(edu => ({
//       id: edu.id,
//       school: edu.school,
//       course: edu.course,
//       startDate: edu.startDate,
//       endDate:
//         typeof edu.endDate === 'string' ? { month: '', year: '' } : edu.endDate,
//       description: edu.description || '',
//     })),
//     professional: resume.professional.work.map(work => ({
//       id: work.id,
//       jobTitle: work.jobTitle,
//       company: work.company,
//       startDate: work.startDate,
//       endDate:
//         typeof work.endDate === 'string'
//           ? { month: '', year: '' }
//           : work.endDate,
//       jobDetails: work.jobDetails,
//     })),
//     skills: resume.skills.map(skill => ({
//       id: skill.id,
//       name: skill.name,
//     })),
//     languages: resume.languages.map(language => ({
//       id: language.id,
//       name: language.name,
//     })),
//   };
// }

const convertBasicInfoToProfile = (basicInfo: BasicInfoType): Profile => {
  const { firstName, lastName, email, phoneNumber } = basicInfo;

  // Map additionalLinks
  const links: Link[] = basicInfo.additionalLinks.map(
    (link: AdditionalLinkType) => ({
      id: link.id,
      url: link.url,
    }),
  );

  // Construct Profile object
  const profile: Profile = {
    firstName,
    lastName,
    email,
    contact: phoneNumber,
    links,
    educational: [], // Placeholder for now, will be mapped separately
    professional: [], // Placeholder for now, will be mapped separately
    skills: [], // Placeholder for now, will be mapped separately
    languages: [], // Placeholder for now, will be mapped separately
  };

  return profile;
};

// Function to convert ProfessionalExperienceType to WorkExperience
export const convertProfessionalExperienceToWorkExperience = (
  experience: ProfessionalExperienceType,
): WorkExperience => {
  return {
    id: experience.id,
    jobTitle: experience.jobTitle,
    company: experience.company,
    startDate: {
      month: experience.startDate.month,
      year: experience.startDate.year,
    },
    endDate: {
      month:
        typeof experience.endDate === 'string' ? '' : experience.endDate.month,
      year:
        typeof experience.endDate === 'string' ? '' : experience.endDate.year,
    },
    jobDetails: experience.jobDetails,
  };
};

// Function to convert EducationType to Education
const convertEducationToEducation = (education: EducationType): Education => {
  return {
    id: education.id,
    school: education.school,
    course: education.course,
    startDate: {
      month: education.startDate.month,
      year: education.startDate.year,
    },
    endDate: {
      month: education.endDate.month,
      year: education.endDate.year,
    },
    description: education.description,
  };
};

// Function to convert SkillType to Skill
const convertSkillToSkill = (skill: SkillType): Skill => {
  return {
    id: skill.id,
    name: skill.name,
  };
};

// Function to convert LanguageType to Language
const convertLanguageToLanguage = (language: LanguageType): Language => {
  return {
    id: language.id,
    name: language.name,
  };
};

// Function to convert Resume to Profile
export const convertResumeToProfile = (resume: Resume): Profile => {
  const { basic, professional, educational, skills, languages } = resume;

  // Convert BasicInfoType to Profile
  let profile: Profile = convertBasicInfoToProfile(basic);

  // Map professional experiences
  profile.professional = professional.work.map(exp =>
    convertProfessionalExperienceToWorkExperience(exp),
  );

  // Map educational experiences
  profile.educational = educational.map(edu =>
    convertEducationToEducation(edu),
  );

  // Map skills
  profile.skills = skills.map(skill => convertSkillToSkill(skill));

  // Map languages
  profile.languages = languages.map(language =>
    convertLanguageToLanguage(language),
  );

  return profile;
};
