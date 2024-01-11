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
  Container,
  IconContainer
} from './ResumeForm.styles';
import { FaCircleChevronDown, FaCircleChevronUp } from 'react-icons/fa6';
import SkillsForm from '../skills-details/SkillsForm';
import LanguagesForm from '../languages-details/LanguagesForm';

interface ResumeFormProps {
  resumeInfo: ResumeInfoType;
  setResumeInfo: React.Dispatch<React.SetStateAction<ResumeInfoType>>;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  resumeInfo,
  setResumeInfo
}) => {
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

  // const handleFinalSubmit = () => {
  //   console.log('Final Form Data:', resumeInfo);
  //   // Add any additional logic for submitting to a server or performing final actions
  // };
  return (
    <Container>
      <AccordionContainer>
        <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle
              style={{ color: accordionState.basic ? '' : 'gray' }}
            >
              Personal Details
            </AccordionHeaderTitle>
            <span onClick={() => toggleAccordion('basic')}>
              {accordionState.basic ? (
                <IconContainer>
                  <FaCircleChevronUp style={{ fontSize: '24px' }} />
                </IconContainer>
              ) : (
                <IconContainer>
                  <FaCircleChevronDown style={{ fontSize: '24px' }} />
                </IconContainer>
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
                <IconContainer>
                  <FaCircleChevronUp style={{ fontSize: '24px' }} />
                </IconContainer>
              ) : (
                <IconContainer>
                  <FaCircleChevronDown style={{ fontSize: '24px' }} />
                </IconContainer>
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
                <IconContainer style={{ fontSize: '24px' }}>
                  <FaCircleChevronUp />
                </IconContainer>
              ) : (
                <IconContainer style={{ fontSize: '24px' }}>
                  <FaCircleChevronDown />
                </IconContainer>
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
                <IconContainer style={{ fontSize: '24px' }}>
                  <FaCircleChevronUp />
                </IconContainer>
              ) : (
                <IconContainer style={{ fontSize: '24px' }}>
                  <FaCircleChevronDown />
                </IconContainer>
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
                <IconContainer style={{ fontSize: '24px' }}>
                  <FaCircleChevronUp />
                </IconContainer>
              ) : (
                <IconContainer style={{ fontSize: '24px' }}>
                  <FaCircleChevronDown />
                </IconContainer>
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
        {/* <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle>Final Submit</AccordionHeaderTitle>
            <button onClick={handleFinalSubmit}>Submit</button>
          </AccordionHeader>
        </AccordionSection> */}
      </AccordionContainer>
    </Container>
  );
};

export default ResumeForm;
