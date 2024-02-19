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
import { ResumeInfoType } from '@/types/profile';
import { WorkExperience, Education } from '@/types/storedResume';
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
    const resume = responseJson.body.profile;

    if (!resume) {
      return;
    }

    const works = resume?.work_experience.map((exp: WorkExperience) => ({
      id: exp.id,
      jobTitle: exp.position,
      company: exp.company_name || '',
      startDate: exp.start_date || '',
      endDate: exp.end_date || '',
      jobDetails: exp.responsibilities.join('\n') || '',
    }));

    const educations = resume?.education.map((edu: Education) => ({
      id: uuidv4(),
      school: '',
      course: '',
      startDate: edu.start_date || '',
      endDate: edu.end_date || '',
      description: '',
    }));

    const languages = resume?.languages.map((lang: string) => ({
      id: uuidv4(),
      name: lang,
    }));

    setResumeInfo({
      basic: {
        firstName: resume?.name || '',
        lastName: '',
        phoneNumber: resume?.personal_information?.phone_number || '',
        email: resume?.email || '',
        address: '',
        linkedin: '',
        additionalLinks: [],
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
          {/* <ATemplate resumeInfo={resumeInfo} /> */}
        </ResumeTemplateContainer>
      </FormViewerContainer>
    </ProfileBuilderContainer>
  );
};

export default ProfileBuilderPage;
