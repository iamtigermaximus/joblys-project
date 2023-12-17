'use client';

import React, { useState } from 'react';
import BasicDetailsForm from '../basic-details/BasicDetailsForm';
import ProfessionalDetailsForm from '../professional-details/ProfessionalDetailsForm';
import EducationalDetailsForm from '../education-details/EducationalDetailsForm';
import { ResumeInfoType } from '@/types/profile';

const ResumeForm: React.FC = () => {
  const [page, setPage] = useState(0);

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
          jobTitle: '',
          company: '',
          startDate: '',
          endDate: '',
          jobDetails: '',
        },
      ],
    },
    education: [
      {
        school: '',
        course: '',
        startDate: '',
        endDate: '',
      },
    ],
  };

  const [resumeInfo, setResumeInfo] = useState(initialState);

  const renderForm = () => {
    switch (page) {
      case 0:
        return (
          <BasicDetailsForm
            resumeInfo={{ basic: resumeInfo.basic }}
            setResumeInfo={setResumeInfo}
            setPage={setPage}
          />
        );
      case 1:
        return (
          <ProfessionalDetailsForm
            resumeInfo={{
              professional: resumeInfo.professional,
            }}
            setResumeInfo={setResumeInfo}
            setPage={setPage}
          />
        );
      case 2:
        return (
          <EducationalDetailsForm
            resumeInfo={{ education: resumeInfo.education }}
            setResumeInfo={setResumeInfo}
            setPage={setPage}
          />
        );
      default:
        return;
    }
  };

  return <div>{renderForm()}</div>;
};

export default ResumeForm;
