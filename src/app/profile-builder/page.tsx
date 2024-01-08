'use client';
import React, { FC, useState } from 'react';
import {
  FormViewerContainer,
  ProfileBuilderContainer,
  ResumeFormContainer,
  ResumeTemplateContainer
} from '../page.styles';
import PageHeader from '@/components/common/page-header/PageHeader';
import ResumeForm from '@/components/profileBuilderForms/profile-form/ResumeForm';
import ResumeTemplate from '@/components/profileBuilderForms/resume-template/ResumeTemplate';
import { ResumeInfoType } from '@/types/profile';

const ProfileBuilderPage: FC = () => {
  const initialState: ResumeInfoType = {
    basic: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      address: '',
      linkedin: '',
      additionalLinks: []
    },
    professional: {
      summary: '',
      work: [
        {
          id: '',
          jobTitle: '',
          company: '',
          startDate: '',
          endDate: '',
          jobDetails: ''
        }
      ]
    },
    educational: {
      education: [
        {
          id: '',
          school: '',
          course: '',
          startDate: '',
          endDate: ''
        }
      ]
    },
    skills: {
      skill: [
        {
          id: '',
          name: ''
        }
      ]
    },
    languages: {
      language: [
        {
          id: '',
          name: ''
        }
      ]
    }
  };

  const [resumeInfo, setResumeInfo] = useState(initialState);
  return (
    <ProfileBuilderContainer>
      <div>
        <title>Profile Builder Page</title>
      </div>
      <PageHeader />
      <FormViewerContainer>
        <ResumeFormContainer>
          <ResumeForm resumeInfo={resumeInfo} setResumeInfo={setResumeInfo} />
        </ResumeFormContainer>
        <ResumeTemplateContainer>
          <ResumeTemplate resumeInfo={resumeInfo} />
        </ResumeTemplateContainer>
      </FormViewerContainer>
    </ProfileBuilderContainer>
  );
};

export default ProfileBuilderPage;
