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
  Input,
  InputContainer,
  PreviewButton,
  PreviewButtonSection,
  PreviewCoverLetterContainer,
  Spinner,
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
import { Coverletter } from '@/types/coverletter';
import MiniCoverLetterTemplate from '@/components/templates/minicoverletter-template/MiniCoverLetterTemplate';
import CoverLetterTemplate from '@/components/templates/coverletter/coverletterTemplate/CoverLetterTemplate';

interface CoverLetterFormProps {
  coverletterId: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  resumeInfo: Resume;
  setResumeInfo: React.Dispatch<React.SetStateAction<Resume>>;
  refreshStoredResume: () => void;
  content: string;
  resumeId: string;
  jobDescription: string;
  generateCoverletterInitialName: () => string;
}

const CoverLetterForm: React.FC<CoverLetterFormProps> = ({
  coverletterId,
  name,
  setName,
  resumeInfo,
  setResumeInfo,
  refreshStoredResume,
  content,
  resumeId: initialResumeId,
  jobDescription: initialJobDescription,
  generateCoverletterInitialName,
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
  const [isEditing, setIsEditing] = useState(false);
  const [newFilename, setNewFilename] = useState<string>('');
  const [editingFilenameId, setEditingFilenameId] = useState<string | null>(
    null,
  );
  const [coverLetterInfo, setCoverLetterInfo] = useState<any>(null);

  const handleFilenameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewFilename(event.target.value);
  };

  const handleFilenameBlur = async (id: string) => {
    if (!newFilename.trim()) return;

    try {
      const response = await fetch(`/api/coverletter/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newFilename }),
      });

      if (!response.ok) {
        throw new Error('Failed to update resume name');
      }

      setIsEditing(false);
    } catch (error: any) {
      console.error('Error updating filename:', error.message);
    }
  };

  const handleFilenameKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
    id: string,
  ) => {
    if (event.key === 'Enter') {
      await handleFilenameBlur(id);
    }
  };

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

  const handleSubmitWriteCoverletter = async (finalFilename: string) => {
    console.log('submitting coverletter');
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
      const generatedFilename =
        finalFilename || generateCoverletterInitialName();

      const response = await fetch('/api/coverletterChanges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coverletterId,
          name: generatedFilename,
          jobDescription: applyJobDescription,
          resumeId,
          filename: generatedFilename,
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
  const handleCoverLetterSubmitLocally = (finalFilename: string) => {
    try {
      // Cache the cover letter locally
      const cachedCoverLetters = JSON.parse(
        localStorage.getItem('cachedCoverLetters') || '[]',
      );
      const updatedCoverLetters = [
        ...cachedCoverLetters,
        { ...coverLetterInfo, filename: finalFilename },
      ];
      localStorage.setItem(
        'cachedCoverLetters',
        JSON.stringify(updatedCoverLetters),
      );

      setProfileCreated(true);
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      console.log('Cover letter data saved locally!', finalFilename);
    } catch (error) {
      console.error('Error saving cover letter data:', error);
    }
  };

  const handleCoverLetterSubmit = async () => {
    const finalFilename = newFilename.trim() ? newFilename : coverLetterInfo; // Default to coverLetterName if no filename provided
    if (session) {
      // If the user is authenticated, submit to server
      await handleSubmitWriteCoverletter(finalFilename);
    } else {
      // Otherwise, save it locally
      handleCoverLetterSubmitLocally(finalFilename);
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
            <CoverLetterTemplate content={content} isMini={true} />
          </CoverLetterContent>
        </PreviewCoverLetterContainer>
      </TemplatePreview>

      <AccordionContainer>
        <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle>
              {t('coverletterNameInputLabel')}
            </AccordionHeaderTitle>
          </AccordionHeader>
          <InputContainer>
            {editingFilenameId === coverletterId ? (
              <Input
                type="text"
                value={newFilename}
                onChange={handleFilenameChange}
                onBlur={() => handleFilenameBlur(coverletterId)} // Save on blur
                onKeyDown={e => handleFilenameKeyDown(e, coverletterId)} // Save on Enter key press
                autoFocus
              />
            ) : (
              <Input
                type="text"
                value={name}
                onClick={() => {
                  setEditingFilenameId(coverletterId);
                  setNewFilename(name);
                }}
                readOnly
              />
            )}
          </InputContainer>
        </AccordionSection>
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
              onClick={handleCoverLetterSubmit}
              disabled={isGeneratingCoverletter}
              style={{
                backgroundColor: isGeneratingCoverletter
                  ? '#494A66'
                  : '#520668',
                cursor: isGeneratingCoverletter ? 'not-allowed' : 'pointer',
                position: 'relative',
                padding: '12px 20px',
              }}
            >
              {isGeneratingCoverletter ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Spinner />
                  {t('generateCoverletter')}
                </div>
              ) : (
                t('generateCoverletter')
              )}{' '}
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
