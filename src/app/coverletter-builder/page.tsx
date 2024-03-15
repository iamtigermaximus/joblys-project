'use client';
import React, { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  FormViewerContainer,
  ProfileBuilderContainer,
  ResumeFormContainer,
  ResumeTemplateContainer,
} from '../page.styles';
import PageHeader from '@/components/common/page-header/PageHeader';
import {
  BasicInfoType,
  EducationType,
  LanguageType,
  ProfessionalExperienceType,
  Resume,
  SkillType,
} from '@/types/profile';
import DefaultTemplate from '@/components/templates/defaultTemplate/DefaultTemplate';
import CoverLetterForm from '@/components/coverLettersForm/CoverLetterForm';
import CoverLetterTemplate from '@/components/templates/coverletterTemplate/CoverLetterTemplate';

const CoverLetterBuilderPage: FC = () => {
  const initialBasicInfo: BasicInfoType = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    linkedin: '',
    additionalLinks: [],
  };

  const initialProfessionalExperience: ProfessionalExperienceType[] = [
    {
      id: '',
      jobTitle: '',
      company: '',
      startDate: { month: '', year: '' },
      endDate: { month: '', year: '' },
      jobDetails: '',
    },
  ];

  const initialEducation: EducationType[] = [
    {
      id: '',
      school: '',
      course: '',
      startDate: { month: '', year: '' },
      endDate: { month: '', year: '' },
      description: '',
    },
  ];

  const initialSkills: SkillType[] = [
    {
      id: '',
      name: '',
    },
  ];

  const initialLanguages: LanguageType[] = [
    {
      id: '',
      name: '',
    },
  ];

  const initialState: Resume = {
    id: '',
    basic: initialBasicInfo,
    professional: {
      summary: '',
      currentRole: '',
      work: initialProfessionalExperience,
    },
    educational: initialEducation,
    skills: initialSkills,
    languages: initialLanguages,
  };

  const [resumeInfo, setResumeInfo] = useState(initialState);

  const handleStoredResumeUpdate = async () => {
    const response = await fetch('/api/cv');
    if (response.status !== 200) {
      return;
    }
    const responseJson = await response.json();
    const resumeProfile: Resume | undefined = responseJson.body.profile;

    if (!resumeProfile) {
      return;
    }

    setResumeInfo(resumeProfile);
  };

  useEffect(() => {
    handleStoredResumeUpdate();
  }, []);

  return (
    <ProfileBuilderContainer>
      <div>
        <title>Cover Letter Builder Page</title>
      </div>
      <PageHeader />
      <FormViewerContainer>
        <ResumeFormContainer>
          <CoverLetterForm
            resumeInfo={resumeInfo}
            setResumeInfo={setResumeInfo}
            refreshStoredResume={handleStoredResumeUpdate}
          />
        </ResumeFormContainer>
        <ResumeTemplateContainer>
          <CoverLetterTemplate />
        </ResumeTemplateContainer>
      </FormViewerContainer>
    </ProfileBuilderContainer>
  );
};

export default CoverLetterBuilderPage;
