// ResumeFormTypes.ts
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

export interface ProfessionalExperienceType {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  jobDetails: string;
}

export interface EducationType {
  id: string;
  school: string;
  course: string;
  startDate: string;
  endDate: string;
}

export interface SkillType {
  id: string;
  name: string;
}

export interface LanguageType {
  id: string;
  name: string;
}

export interface ResumeInfoType {
  basic: BasicInfoType;
  professional: {
    summary: string;
    // skills: SkillType[];
    // languages: LanguageType[];
    work: ProfessionalExperienceType[];
  };
  educational: { education: EducationType[] };
  skills: { skill: SkillType[] };
  languages: { language: LanguageType[] };
}
