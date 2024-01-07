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
  AccordionHeaderTitle,
  AccordionSection,
  Container
} from './ResumeForm.styles';
import { FaCircleChevronDown, FaCircleChevronUp } from 'react-icons/fa6';
import SkillsForm from '../skills-details/SkillsForm';
import LanguagesForm from '../languages-details/LanguagesForm';

const ResumeForm: React.FC = () => {
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
  const [accordionState, setAccordionState] = useState({
    basic: true,
    professional: false,
    educational: false,
    skills: false,
    languages: false
  });

  const toggleAccordion = (section: keyof typeof accordionState) => {
    setAccordionState(prevState => {
      const newState = {
        basic: false,
        professional: false,
        educational: false,
        skills: false,
        languages: false
      };

      const isSameSection = prevState[section];
      newState[section] = !isSameSection;

      return newState;
    });
  };

  return (
    <Container>
      <AccordionContainer>
        <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle
              style={{ color: accordionState.basic ? '' : 'gray' }}
            >
              Basic Details
            </AccordionHeaderTitle>
            <span onClick={() => toggleAccordion('basic')}>
              {accordionState.basic ? (
                <FaCircleChevronUp />
              ) : (
                <FaCircleChevronDown />
              )}
            </span>
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
          <AccordionHeader>
            <AccordionHeaderTitle
              style={{ color: accordionState.professional ? '' : 'gray' }}
            >
              Professional Details
            </AccordionHeaderTitle>
            <span onClick={() => toggleAccordion('professional')}>
              {accordionState.professional ? (
                <FaCircleChevronUp />
              ) : (
                <FaCircleChevronDown />
              )}
            </span>
          </AccordionHeader>
          {accordionState.professional && (
            <AccordionContent>
              <ProfessionalDetailsForm
                resumeInfo={{
                  professional: resumeInfo.professional
                }}
                setResumeInfo={setResumeInfo}
              />
            </AccordionContent>
          )}
        </AccordionSection>

        <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle
              style={{ color: accordionState.educational ? '' : 'gray' }}
            >
              Educational Details
            </AccordionHeaderTitle>
            <span onClick={() => toggleAccordion('educational')}>
              {accordionState.educational ? (
                <FaCircleChevronUp />
              ) : (
                <FaCircleChevronDown />
              )}
            </span>
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
        <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle
              style={{ color: accordionState.skills ? '' : 'gray' }}
            >
              Skills
            </AccordionHeaderTitle>
            <span onClick={() => toggleAccordion('skills')}>
              {accordionState.skills ? (
                <FaCircleChevronUp />
              ) : (
                <FaCircleChevronDown />
              )}
            </span>
          </AccordionHeader>
          {accordionState.skills && (
            <AccordionContent>
              <SkillsForm
                resumeInfo={{ skills: resumeInfo.skills }}
                setResumeInfo={setResumeInfo}
              />
            </AccordionContent>
          )}
        </AccordionSection>
        <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle
              style={{ color: accordionState.languages ? '' : 'gray' }}
            >
              Languages
            </AccordionHeaderTitle>
            <span onClick={() => toggleAccordion('languages')}>
              {accordionState.languages ? (
                <FaCircleChevronUp />
              ) : (
                <FaCircleChevronDown />
              )}
            </span>
          </AccordionHeader>
          {accordionState.languages && (
            <AccordionContent>
              <LanguagesForm
                resumeInfo={{ languages: resumeInfo.languages }}
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
