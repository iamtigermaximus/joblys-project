'use client';

import React, { useState } from 'react';
import BasicDetailsForm from '../basic-details/BasicDetailsForm';
import ProfessionalDetailsForm from '../professional-details/ProfessionalDetailsForm';
import EducationalDetailsForm from '../education-details/EducationalDetailsForm';
import { ResumeInfoType } from '@/types/profile';
import { Container } from './ResumeForm.styles';

const ResumeForm: React.FC = () => {
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
      skills: [],
      languages: [],
      work: [
        {
          id: '',
          jobTitle: '',
          company: '',
          startDate: '',
          endDate: '',
          jobDetails: '',
        },
      ],
    },
    educational: {
      education: [
        {
          id: '',
          school: '',
          course: '',
          startDate: '',
          endDate: '',
        },
      ],
    },
  };

  const [resumeInfo, setResumeInfo] = useState(initialState);

  return (
    <Container>
      <BasicDetailsForm
        resumeInfo={{ basic: resumeInfo.basic }}
        setResumeInfo={setResumeInfo}
      />
      <ProfessionalDetailsForm
        resumeInfo={{
          professional: resumeInfo.professional,
        }}
        setResumeInfo={setResumeInfo}
      />
      <EducationalDetailsForm
        resumeInfo={{ educational: resumeInfo.educational }}
        setResumeInfo={setResumeInfo}
      />
    </Container>
  );
};

export default ResumeForm;
