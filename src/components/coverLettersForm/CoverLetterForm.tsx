'use client';

import React, { useState } from 'react';

import { Resume } from '@/types/profile';
import {
  AccordionContainer,
  AccordionContent,
  AccordionHeader,
  AccordionHeaderTitle,
  AccordionSection,
  Container,
  GenerateButton,
  HeaderItem,
  IconContainer,
  InputContainer,
  InputLabel,
  PreviewButton,
  PreviewButtonSection,
  SuccessAlert,
  TemplateHeaderItem,
  TemplatePreview,
  TemplatePreviewHeader,
  TextArea,
} from './CoverLetterForm.styles';
import {
  FaArrowLeft,
  FaCircleChevronDown,
  FaCircleChevronUp,
  FaDownload,
} from 'react-icons/fa6';
import DefaultTemplate from '@/components/templates/defaultTemplate/DefaultTemplate';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import BasicDetailsForm from '../profileBuilderForms/basic-details/BasicDetailsForm';
import ProfessionalDetailsForm from '../profileBuilderForms/professional-details/ProfessionalDetailsForm';
import EducationalDetailsForm from '../profileBuilderForms/education-details/EducationalDetailsForm';
import SkillsForm from '../profileBuilderForms/skills-details/SkillsForm';
import LanguagesForm from '../profileBuilderForms/languages-details/LanguagesForm';
import CoverLetterTemplate from '../templates/coverletterTemplate/CoverLetterTemplate';

interface CoverLetterFormProps {
  coverletterId: string;
  resumeInfo: Resume;
  setResumeInfo: React.Dispatch<React.SetStateAction<Resume>>;
  refreshStoredResume: () => void;
}

const CoverLetterForm: React.FC<CoverLetterFormProps> = ({
  coverletterId,
  resumeInfo,
  setResumeInfo,
  refreshStoredResume,
}) => {
  const [accordionState, setAccordionState] = useState({
    basic: true,
    professional: false,
    educational: false,
    skills: false,
    languages: false,
  });
  const router = useRouter();
  const [click, setClick] = useState(true);
  const resumeTemplate = () => setClick(!click);
  const { data: session } = useSession();
  const [profileCreated, setProfileCreated] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [applyJobDescription, setApplyJobDescription] = useState('');

  const handleApplyJobDescriptionChange = async (jobDescription: string) => {
    setApplyJobDescription(jobDescription);
  };

  const handleClosePreview = () => {
    setClick(false);
  };

  const toggleAccordion = (section: keyof typeof accordionState) => {
    setAccordionState(prevState => {
      const newState = {
        basic: false,
        professional: false,
        educational: false,
        skills: false,
        languages: false,
      };

      const isSameSection = prevState[section];
      newState[section] = !isSameSection;

      return newState;
    });
  };

  const handleSubmitResume = async () => {
    try {
      const response = await fetch('/api/coverletterChanges', {
        method: 'POST',
        body: JSON.stringify({
          id: coverletterId,
          coverletter: resumeInfo,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload resume');
      }
      setProfileCreated(true);
      setShowSuccessMessage(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      console.log('Coverletter uploaded successfully!');
    } catch (error: any) {
      console.error('Error uploading coverletter:', error.message);
    }
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  return (
    <Container>
      <TemplatePreview
        className={click ? 'resume active' : 'resume'}
        onClick={resumeTemplate}
      >
        <TemplatePreviewHeader>
          <TemplateHeaderItem>
            <HeaderItem>
              <FaArrowLeft />
            </HeaderItem>
          </TemplateHeaderItem>
          <TemplateHeaderItem>
            <HeaderItem>PREVIEW</HeaderItem>
          </TemplateHeaderItem>
          <TemplateHeaderItem>
            <HeaderItem onClick={handleSignIn}>
              <FaDownload />
            </HeaderItem>
          </TemplateHeaderItem>
        </TemplatePreviewHeader>
        {/* <CoverLetterTemplate id="coverletter-template" /> */}
        <CoverLetterTemplate />
      </TemplatePreview>
      <AccordionContainer>
        <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle>Job Description</AccordionHeaderTitle>
          </AccordionHeader>
          <InputContainer>
            <TextArea
              placeholder="Paste job description here"
              value={applyJobDescription}
              onChange={e => handleApplyJobDescriptionChange(e.target.value)}
            />
          </InputContainer>
        </AccordionSection>

        <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle
              style={{ color: accordionState.basic ? '' : 'gray' }}
              onClick={() => toggleAccordion('basic')}
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
                basic={resumeInfo.basic}
                setResumeInfo={setResumeInfo}
              />
            </AccordionContent>
          )}
        </AccordionSection>

        <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle
              style={{ color: accordionState.professional ? '' : 'gray' }}
              onClick={() => toggleAccordion('professional')}
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
                resumeId=""
                professional={resumeInfo.professional}
                setResumeInfo={setResumeInfo}
                refreshStoredResume={refreshStoredResume}
              />
            </AccordionContent>
          )}
        </AccordionSection>

        <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle
              style={{ color: accordionState.educational ? '' : 'gray' }}
              onClick={() => toggleAccordion('educational')}
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
                educational={resumeInfo.educational}
                setResumeInfo={setResumeInfo}
              />
            </AccordionContent>
          )}
        </AccordionSection>
        <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle
              style={{ color: accordionState.skills ? '' : 'gray' }}
              onClick={() => toggleAccordion('skills')}
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
                skills={resumeInfo.skills}
                setResumeInfo={setResumeInfo}
              />
            </AccordionContent>
          )}
        </AccordionSection>
        <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle
              style={{ color: accordionState.languages ? '' : 'gray' }}
              onClick={() => toggleAccordion('languages')}
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
                languages={resumeInfo.languages}
                setResumeInfo={setResumeInfo}
              />
            </AccordionContent>
          )}
        </AccordionSection>
        <AccordionSection>
          <PreviewButtonSection>
            <PreviewButton onClick={resumeTemplate}>Preview</PreviewButton>
            <GenerateButton onClick={handleSubmitResume}>
              Generate a cover letter
            </GenerateButton>
          </PreviewButtonSection>
          {showSuccessMessage && (
            <PreviewButtonSection>
              <SuccessAlert>
                You have successfully created a cover letter.
              </SuccessAlert>
            </PreviewButtonSection>
          )}
          {/* <AccordionHeader>
            <AccordionHeaderTitle></AccordionHeaderTitle>
          </AccordionHeader> */}
        </AccordionSection>
      </AccordionContainer>
    </Container>
  );
};

export default CoverLetterForm;
