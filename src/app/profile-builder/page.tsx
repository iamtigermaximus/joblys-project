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
import ResumeForm from '@/components/profileBuilderForms/profile-form/ResumeForm';
import ResumeTemplate from '@/components/profileBuilderForms/resume-template/ResumeTemplate';
import { EducationType, LanguageType, ProfessionalExperienceType, Resume, ResumeInfoType } from '@/types/profile';
import Minimalist from '@/components/templates/minimalist/Minimalist';
import DefaultTemplate from '@/components/templates/defaultTemplate/DefaultTemplate';

const ProfileBuilderPage: FC = () => {
  const initialState: ResumeInfoType = {
    basic: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      address: '',
      linkedin: '',
      additionalLinks: [],
    },
    professional: {
      summary: '',
      currentRole: '',
      work: [
        {
          id: uuidv4(),
          jobTitle: '',
          company: '',
          startDate: { month: '', year: '' },
          endDate: { month: '', year: '' },
          jobDetails: '',
        },
      ],
    },
    educational: {
      education: [
        {
          id: uuidv4(),
          school: '',
          course: '',
          startDate: { month: '', year: '' },
          endDate: { month: '', year: '' },
          description: '',
        },
      ],
    },
    skills: {
      skill: [
        {
          id: uuidv4(),
          name: '',
        },
      ],
    },
    languages: {
      language: [
        {
          id: uuidv4(),
          name: '',
        },
      ],
    },
  };

  const [resumeInfo, setResumeInfo] = useState(initialState);

  const handleStoredResumeUpdate = async () => {
    const response = await fetch('/api/cv');
    if (response.status != 200) {
      return;
    }

    const responseJson = await response.json();
    const resume = responseJson.body.profile as Resume;

    if (!resume) {
      return;
    }

    const works = resume?.professionalExperience.map((exp: ProfessionalExperienceType) => ({
      id: exp.id || uuidv4(),
      jobTitle: exp.jobTitle || '',
      company: exp.company || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      jobDetails: exp.jobDetails || '',
    }));

    const educations = resume?.education.map((edu: EducationType) => ({
      id: edu.id || uuidv4(),
      school: edu.school || '',
      course: edu.course || '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      description: edu.description || '',
    }));

    const languages = resume?.languages.map((lang: LanguageType) => ({
      id: lang.id || uuidv4(),
      name: lang.name || '',
    }));

    setResumeInfo({
      basic: {
        firstName: resume?.firstName || '',
        lastName: resume?.lastName || '',
        phoneNumber: resume?.phoneNumber || '',
        email: resume?.email || '',
        address: resume?.address || '',
        linkedin: resume?.linkedin || '',
        additionalLinks: resume?.additionalLinks || [],
      },
      professional: {
        summary: '',
        currentRole: '',
        work: works || [],
      },
      educational: {
        education: educations || [],
      },
      skills: {
        skill: [
          {
            id: uuidv4(),
            name: '',
          },
        ],
      },
      languages: {
        language: languages,
      },
    });
  };

  useEffect(() => {
    handleStoredResumeUpdate();
  }, []);

  return (
    <ProfileBuilderContainer>
      <div>
        <title>Profile Builder Page</title>
      </div>
      <PageHeader />
      <FormViewerContainer>
        <ResumeFormContainer>
          <ResumeForm
            resumeInfo={resumeInfo}
            setResumeInfo={setResumeInfo}
            refreshStoredResume={handleStoredResumeUpdate}
          />
        </ResumeFormContainer>
        <ResumeTemplateContainer>
          {/* <ResumeTemplate resumeInfo={resumeInfo} /> */}
          {/* <Minimalist resumeInfo={resumeInfo} /> */}
          <DefaultTemplate resumeInfo={resumeInfo} />
        </ResumeTemplateContainer>
      </FormViewerContainer>
    </ProfileBuilderContainer>
  );
};

export default ProfileBuilderPage;
