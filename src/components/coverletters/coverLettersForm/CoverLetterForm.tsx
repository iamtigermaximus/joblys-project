'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Resume } from '@/types/resume';
import {
  AccordionContainer,
  AccordionHeader,
  AccordionHeaderTitle,
  AccordionSection,
  Container,
  CoverLetterContent,
  GenerateButton,
  HeaderItem,
  InputContainer,
  PreviewButton,
  PreviewButtonSection,
  PreviewCoverLetterContainer,
  SuccessAlert,
  TemplateHeaderItem,
  TemplatePreview,
  TemplatePreviewHeader,
  TextArea,
  TooltipContainer,
} from './CoverLetterForm.styles';
import { FaArrowLeft, FaDownload } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import ResumesDropdown from '@/components/resumes/ResumesDropdown';
import MiniCoverLetterTemplate from '@/components/templates/minicoverletter-template/MiniCoverLetterTemplate';
import { IoMdHelpCircleOutline } from 'react-icons/io';

interface CoverLetterFormProps {
  coverletterId: string;
  resumeInfo: Resume;
  setResumeInfo: React.Dispatch<React.SetStateAction<Resume>>;
  refreshStoredResume: () => void;
  content: string;
  resumeId: string;
  jobDescription: string;
}

const CoverLetterForm: React.FC<CoverLetterFormProps> = ({
  coverletterId,
  resumeInfo,
  setResumeInfo,
  refreshStoredResume,
  content,
  resumeId: initialResumeId,
  jobDescription: initialJobDescription,
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
  const [applyJobDescription, setApplyJobDescription] = useState<string>(
    initialJobDescription,
  );
  const [resumeId, setResumeId] = useState<string>(initialResumeId);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showHelpTooltip, setShowHelpTooltip] = useState(false);
  const helpIconRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Toggle tooltip
  const toggleHelpTooltip = () => {
    setShowHelpTooltip(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setShowHelpTooltip(false);
      }
    };

    if (showHelpTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showHelpTooltip]);

  // useEffect(() => {
  //   if (!coverletterId) return;

  //   const fetchCoverLetterDetails = async () => {
  //     try {
  //       const response = await fetch(`/api/coverletters/${coverletterId}`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch cover letter details.');
  //       }
  //       const data = await response.json();
  //       console.log('Fetched data:', data);
  //       setApplyJobDescription(data.jobDescription);
  //       setResumeId(data.resumeId);
  //     } catch (error: any) {
  //       console.error('Error fetching cover letter details:', error.message);
  //     }
  //   };

  //   fetchCoverLetterDetails();
  // }, [coverletterId]);

  useEffect(() => {
    if (initialJobDescription) {
      setApplyJobDescription(initialJobDescription);
    }
    if (initialResumeId) {
      setResumeId(initialResumeId);
    }
  }, [initialJobDescription, initialResumeId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleApplyJobDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setApplyJobDescription(e.target.value);
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

  const handleSubmitWriteCoverletter = async () => {
    if (!session) {
      setError('You need to be signed in to generate a cover letter.');
      return;
    }

    if (!applyJobDescription || !resumeId) {
      setError('Please select a resume and enter a job description.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/coverletterChanges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coverletterId,
          jobDescription: applyJobDescription,
          resumeId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create cover letter.');
      }

      setProfileCreated(true);
      setShowSuccessMessage(true);
      refreshStoredResume();

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error: any) {
      console.error('Error creating coverletter:', error.message);
    } finally {
      setIsLoading(false);
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
        <PreviewCoverLetterContainer>
          <CoverLetterContent>
            <MiniCoverLetterTemplate content={content} />
          </CoverLetterContent>
        </PreviewCoverLetterContainer>
      </TemplatePreview>
      <AccordionContainer>
        <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle>Job Ad</AccordionHeaderTitle>
            <AccordionHeaderTitle ref={helpIconRef}>
              <IoMdHelpCircleOutline
                onClick={toggleHelpTooltip}
                style={{ cursor: 'pointer' }}
              />
              {showHelpTooltip && (
                <TooltipContainer ref={tooltipRef}>
                  <p>
                    By pasting the job ad here, we&apos;ll extract essential
                    information and keywords, allowing you to tailor your
                    coverletter for the specific job. You can use this
                    information to customize your coverletter and make your
                    application more competitive.
                  </p>
                </TooltipContainer>
              )}
            </AccordionHeaderTitle>
          </AccordionHeader>
          <InputContainer>
            <TextArea
              placeholder="Paste job description here"
              value={applyJobDescription}
              onChange={handleApplyJobDescriptionChange}
            />
          </InputContainer>
        </AccordionSection>
        <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle>Resumes</AccordionHeaderTitle>
          </AccordionHeader>
        </AccordionSection>

        <ResumesDropdown
          selectedResumeId={resumeId}
          setSelectedResumeId={setResumeId}
        />

        <AccordionSection>
          <PreviewButtonSection>
            <PreviewButton onClick={resumeTemplate}>Preview</PreviewButton>
            <GenerateButton onClick={handleSubmitWriteCoverletter}>
              {isLoading ? 'Generating...' : 'Generate a cover letter'}{' '}
              {/* Update button text based on loading state */}
            </GenerateButton>
          </PreviewButtonSection>
          {showSuccessMessage && (
            <PreviewButtonSection>
              <SuccessAlert>
                You have successfully created a cover letter.
              </SuccessAlert>
            </PreviewButtonSection>
          )}
        </AccordionSection>
      </AccordionContainer>
    </Container>
  );
};

export default CoverLetterForm;
