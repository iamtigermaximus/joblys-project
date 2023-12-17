// ResumeFormTypes.ts

export interface BasicInfoType {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  linkedin: string;
  additionalLinks: string[];
}

export interface ProfessionalExperienceType {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  jobDetails: string;
}

export interface EducationType {
  school: string;
  course: string;
  startDate: string;
  endDate: string;
}

export interface ResumeInfoType {
  basic: BasicInfoType;
  professional: {
    summary: string;
    skills: string[];
    languages: string[];
    work: ProfessionalExperienceType[];
  };
  education: EducationType[];
}
