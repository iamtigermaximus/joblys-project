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
import ResumesDropdown from '@/components/resumes/ResumesDropdown';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { useTranslations } from 'next-intl';
import MiniCoverLetterTemplate from '@/components/templates/minicoverletter-template/MiniCoverLetterTemplate';

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
  const t = useTranslations('CoverletterBuilder');
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
  const [isGeneratingCoverletter, setIsGeneratingCoverletter] = useState(false);

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
    setIsGeneratingCoverletter(true);
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
      setIsGeneratingCoverletter(false);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error: any) {
      console.error('Error creating coverletter:', error.message);
    } finally {
      setIsLoading(false);
      setIsGeneratingCoverletter(false);
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
            <HeaderItem>{t('preview')}</HeaderItem>
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
            <AccordionHeaderTitle>{t('jobAd')}</AccordionHeaderTitle>
            <AccordionHeaderTitle ref={helpIconRef}>
              <IoMdHelpCircleOutline
                onClick={toggleHelpTooltip}
                style={{ cursor: 'pointer' }}
              />
              {showHelpTooltip && (
                <TooltipContainer ref={tooltipRef}>
                  <p>{t('helpTooltip')}</p>
                </TooltipContainer>
              )}
            </AccordionHeaderTitle>
          </AccordionHeader>
          <InputContainer>
            <TextArea
              placeholder={t('jobAdPlaceholder')}
              value={applyJobDescription}
              onChange={handleApplyJobDescriptionChange}
            />
          </InputContainer>
        </AccordionSection>
        <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle>{t('resumesTitle')}</AccordionHeaderTitle>
          </AccordionHeader>
        </AccordionSection>

        <ResumesDropdown
          selectedResumeId={resumeId}
          setSelectedResumeId={setResumeId}
        />

        <AccordionSection>
          <PreviewButtonSection>
            <PreviewButton onClick={resumeTemplate}>
              {t('preview')}
            </PreviewButton>
            <GenerateButton
              onClick={handleSubmitWriteCoverletter}
              disabled={isGeneratingCoverletter}
              style={{
                backgroundColor: isGeneratingCoverletter
                  ? '#494A66'
                  : '#520668',
                cursor: isGeneratingCoverletter ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading ? t('generating') : t('generateCoverletter')}
              {/* Update button text based on loading state */}
            </GenerateButton>
          </PreviewButtonSection>
          {showSuccessMessage && (
            <PreviewButtonSection>
              <SuccessAlert>{t('successAlert')} </SuccessAlert>
            </PreviewButtonSection>
          )}
        </AccordionSection>
      </AccordionContainer>
    </Container>
  );
};

export default CoverLetterForm;
