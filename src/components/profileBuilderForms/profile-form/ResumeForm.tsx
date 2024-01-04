'use client';

import React, { useState } from 'react';
import BasicDetailsForm from '../basic-details/BasicDetailsForm';
import ProfessionalDetailsForm from '../professional-details/ProfessionalDetailsForm';
import EducationalDetailsForm from '../education-details/EducationalDetailsForm';
import { ResumeInfoType } from '@/types/profile';
import {
  AccordionContainer,
  AccordionContent,
  AccordionHeader,
  AccordionSection,
  Container,
} from './ResumeForm.styles';

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
  const [accordionState, setAccordionState] = useState({
    basic: true,
    professional: false,
    educational: false,
  });

  const toggleAccordion = (section: keyof typeof accordionState) => {
    setAccordionState((prevState) => {
      const newState = {
        basic: false,
        professional: false,
        educational: false,
      };
      newState[section] = true;
      return newState;
    });
  };

  return (
    <Container>
      <AccordionContainer>
        <AccordionSection>
          <AccordionHeader onClick={() => toggleAccordion('basic')}>
            Basic Details
          </AccordionHeader>
          {accordionState.basic && (
            <AccordionContent>
              <BasicDetailsForm
                resumeInfo={{ basic: resumeInfo.basic }}
                setResumeInfo={setResumeInfo}
              />
            </AccordionContent>
          )}
        </AccordionSection>

        <AccordionSection>
          <AccordionHeader onClick={() => toggleAccordion('professional')}>
            Professional Details
          </AccordionHeader>
          {accordionState.professional && (
            <AccordionContent>
              <ProfessionalDetailsForm
                resumeInfo={{
                  professional: resumeInfo.professional,
                }}
                setResumeInfo={setResumeInfo}
              />
            </AccordionContent>
          )}
        </AccordionSection>

        <AccordionSection>
          <AccordionHeader onClick={() => toggleAccordion('educational')}>
            Educational Details
          </AccordionHeader>
          {accordionState.educational && (
            <AccordionContent>
              <EducationalDetailsForm
                resumeInfo={{ educational: resumeInfo.educational }}
                setResumeInfo={setResumeInfo}
              />
            </AccordionContent>
          )}
        </AccordionSection>
      </AccordionContainer>
    </Container>
  );
};

export default ResumeForm;
