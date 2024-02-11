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

// export interface ProfessionalExperienceType {
//   id: string;
//   jobTitle: string;
//   company: string;
//   startDate: string;
//   endDate: string;
//   jobDetails: string;
// }

// export interface EducationType {
//   id: string;
//   school: string;
//   course: string;
//   startDate: string;
//   endDate: string;
//   description: string;
// }
export interface ProfessionalExperienceType {
  id: string;
  jobTitle: string;
  company: string;
  startDate: { month: string; year: string };
  endDate: { month: string; year: string };
  jobDetails: string;
}

export interface EducationType {
  id: string;
  school: string;
  course: string;
  startDate: { month: string; year: string };
  endDate: { month: string; year: string };
  description: string;
}

export interface SkillType {
  id: string;
  name: string;
}

export interface LanguageType {
  id: string;
  name: string;
}

export interface Resume extends BasicInfoType {
  professionalExperience: ProfessionalExperienceType[];
  education: EducationType[];
  skills: SkillType[];
  languages: LanguageType[];
}

export interface ResumeInfoType {
  id: string;
  basic: BasicInfoType;
  professional: {
    summary: string;
    currentRole: string;
    // skills: SkillType[];
    // languages: LanguageType[];
    work: ProfessionalExperienceType[];
  };
  educational: { education: EducationType[] };
  skills: { skill: SkillType[] };
  languages: { language: LanguageType[] };
}
