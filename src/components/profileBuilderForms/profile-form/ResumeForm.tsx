'use client';

import React, { useState } from 'react';
import BasicDetailsForm from '../basic-details/BasicDetailsForm';
import ProfessionalDetailsForm from '../professional-details/ProfessionalDetailsForm';
import EducationalDetailsForm from '../education-details/EducationalDetailsForm';
import { Resume } from '@/types/profile';
import {
  AccordionContainer,
  AccordionContent,
  AccordionHeader,
  AccordionHeaderTitle,
  AccordionSection,
  Container,
  CreateProfileButton,
  HeaderItem,
  IconContainer,
  InputContainer,
  PreviewButton,
  PreviewButtonSection,
  SuccessAlert,
  TemplateHeaderItem,
  TemplatePreview,
  TemplatePreviewHeader,
  TextArea,
} from './ResumeForm.styles';
import {
  FaArrowLeft,
  FaCircleChevronDown,
  FaCircleChevronUp,
  FaDownload,
} from 'react-icons/fa6';
import SkillsForm from '../skills-details/SkillsForm';
import LanguagesForm from '../languages-details/LanguagesForm';
import DefaultTemplate from '@/components/templates/defaultTemplate/DefaultTemplate';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface ResumeFormProps {
  resumeId: string;
  resumeInfo: Resume;
  setResumeInfo: React.Dispatch<React.SetStateAction<Resume>>;
  refreshStoredResume: () => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  resumeId,
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
      const response = await fetch('/api/cvChanges', {
        method: 'POST',
        body: JSON.stringify({
          id: resumeId,
          resume: resumeInfo
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
      console.log('Resume uploaded successfully!');
    } catch (error: any) {
      console.error('Error uploading resume:', error.message);
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
        <DefaultTemplate id="default-template" resumeInfo={resumeInfo} />
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
            <CreateProfileButton onClick={handleSubmitResume}>
              Create Profile
            </CreateProfileButton>
          </PreviewButtonSection>
          {showSuccessMessage && (
            <PreviewButtonSection>
              <SuccessAlert>
                You have successfully created a profile.
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

export default ResumeForm;
