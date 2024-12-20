'use client';

import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import BasicDetailsForm from '../basic-details/BasicDetailsForm';
import ProfessionalDetailsForm from '../professional-details/ProfessionalDetailsForm';
import EducationalDetailsForm from '../education-details/EducationalDetailsForm';
import { initialResume, Resume } from '@/types/resume';
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
  PreviewResumeContainer,
  SuccessAlert,
  TemplateHeaderItem,
  TemplatePreview,
  TemplatePreviewHeader,
  TextArea,
  ResumeContent,
  UploadSection,
  SectionTitleContainer,
  SectionTitle,
  FileUpload,
  UploadButton,
  TooltipContainer,
  FileUploadButton,
  UploadInputContainer,
  FilenameContainer,
  Spinner,
  IconWrapper,
} from './ResumeForm.styles';
import {
  FaArrowLeft,
  FaCircleChevronDown,
  FaCircleChevronUp,
  FaDownload,
} from 'react-icons/fa6';
import SkillsForm from '../skills-details/SkillsForm';
import LanguagesForm from '../languages-details/LanguagesForm';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DownloadPDFButton from '@/components/templates/resume/defaultTemplate/DownloadPDFButton';
import DefaultTemplate from '@/components/templates/resume/defaultTemplate/DefaultTemplate';
import { convertProfileToResume, Profile } from '@/types/profile';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { useTranslations } from 'next-intl';
import Classic from '@/components/templates/resume/classic/Classic';
import { Input } from '../basic-details/BasicDetailsForm.styles';
import {
  LoadingMessage,
  LoadingMessageContainer,
} from '@/components/profile/create-profile/upload-cv/UploadCV.styles';

interface ResumeFormProps {
  resumeId: string;
  resumeName: string;
  setResumeName: React.Dispatch<React.SetStateAction<string>>;
  resumeInfo: Resume;
  setResumeInfo: React.Dispatch<React.SetStateAction<Resume>>;
  refreshStoredResume: () => void;
  existingData?: Profile | null;
  setExistingData: React.Dispatch<React.SetStateAction<Profile | null>>;
  generateResumeInitialName: () => string;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  resumeId,
  resumeName,
  setResumeName,
  resumeInfo,
  setResumeInfo,
  refreshStoredResume,
  existingData,
  setExistingData,
  generateResumeInitialName,
}) => {
  const t = useTranslations('ResumeBuilder');
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
  const [cvFile, setCVFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadMessageTimeout, setUploadMessageTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [extractedJobDetails, setExtractedJobDetails] = useState<any>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const [showHelpTooltip, setShowHelpTooltip] = useState(false);
  const helpIconRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isCreatingResume, setIsCreatingResume] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newFilename, setNewFilename] = useState<string>('');
  const [editingFilenameId, setEditingFilenameId] = useState<string | null>(
    null,
  );

  const handleResumeNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewFilename(event.target.value);
  };

  const handleResumeNameBlur = async () => {
    if (!newFilename.trim()) return;

    try {
      const response = await fetch(`/api/cv/${resumeId}`, {
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

  const handleResumeNameKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      await handleResumeNameBlur();
    }
  };

  // Clean up timeout on component unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, []);

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
    return () => {
      if (uploadMessageTimeout) {
        clearTimeout(uploadMessageTimeout);
      }
    };
  }, [uploadMessageTimeout]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    const file = event.target.files[0];
    setCVFile(file);
  };

  const handleUploadCV = async () => {
    if (!cvFile) return;

    setIsUploading(true);

    let formData = new FormData();
    formData.append('file', cvFile);

    try {
      const cvResp = await fetch('/api/cv', {
        method: 'POST',
        body: formData,
      });

      if (cvResp.ok) {
        const cvData = await cvResp.json();
        const structuredCVContent = cvData.body;
        console.log('Structured CV Content:', structuredCVContent);

        const profileResp = await fetch('/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ profile: structuredCVContent }),
        });

        const newData = convertProfileToResume(structuredCVContent);

        if (profileResp.ok) {
          const profileResponseData = await profileResp.json();
          setUploadMessage('Upload successful!');

          const updatedProfileData = {
            ...existingData,
            ...profileResponseData.body,
          };

          setExistingData(updatedProfileData);

          setUploadMessage('Upload successful!');

          setResumeInfo(newData);
        } else {
          setUploadMessage(`Uploading profile failed: ${profileResp.status}`);
        }
      } else {
        setUploadMessage(`Uploading CV failed: ${cvResp.status}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadMessage('Uploading resume failed.');
    } finally {
      setIsUploading(false);
      if (uploadMessageTimeout) {
        clearTimeout(uploadMessageTimeout);
      }
      const timeout = setTimeout(() => {
        setUploadMessage('');
      }, 5000);
      setUploadMessageTimeout(timeout);
    }
  };

  const handleApplyJobDescriptionChange = (jobDescription: string) => {
    setApplyJobDescription(jobDescription);
  };

  // Automatically extract job details when job description changes
  useEffect(() => {
    if (!applyJobDescription) return;

    // if (debounceTimeout) {
    //   clearTimeout(debounceTimeout);
    // }

    const timeout = setTimeout(async () => {
      setIsExtracting(true);
      try {
        const response = await fetch('/api/jobAdExtraction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ job_description: applyJobDescription }),
        });

        if (response.ok) {
          const data = await response.json();
          setExtractedJobDetails(data.data);
          console.log('Extracted Job Details:', data.data);
        } else {
          console.error('Failed to extract job details');
        }
      } catch (error) {
        console.error('Error extracting job details:', error);
      } finally {
        setIsExtracting(false);
      }
    }, 1000);

    // setDebounceTimeout(timeout);
  }, [applyJobDescription]);

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

  const handleSubmitResume = async (finalFilename: string) => {
    setIsCreatingResume(true);

    try {
      const generatedFilename = finalFilename || generateResumeInitialName();

      console.log('Generated Filename:', generatedFilename);
      const response = await fetch('/api/cvChanges', {
        method: 'POST',
        body: JSON.stringify({
          id: resumeId,
          name: generatedFilename,
          resume: resumeInfo,
          filename: generatedFilename,
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
      setIsCreatingResume(false); // Resume creation process completed
    } catch (error: any) {
      console.error('Error uploading resume:', error.message);
      setIsCreatingResume(false); // Ensure the process is marked as finished
    }
  };

  const handleSubmitResumeLocally = (finalFilename: string) => {
    try {
      // Cache the resume locally
      const cachedResumes = JSON.parse(
        localStorage.getItem('cachedResumes') || '[]',
      );
      const updatedResumes = [
        ...cachedResumes,
        { ...resumeInfo, filename: finalFilename },
      ];
      localStorage.setItem('cachedResumes', JSON.stringify(updatedResumes));

      setProfileCreated(true);
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      console.log('Resume data saved locally!', finalFilename);
    } catch (error) {
      console.error('Error saving resume data:', error);
    }
  };

  const handleSubmit = async () => {
    const finalFilename = newFilename.trim() ? newFilename : resumeName;
    if (session) {
      // User is authenticated, submit resume to server
      await handleSubmitResume(finalFilename);
    } else {
      // User is not authenticated, save resume locally
      handleSubmitResumeLocally(finalFilename);
    }
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  return (
    <Container>
      {session && (
        <UploadSection>
          <SectionTitleContainer>
            <SectionTitle>{t('uploadTitle')}</SectionTitle>
          </SectionTitleContainer>
          {/* <FileUpload
            type="file"
            accept=".docx,.pdf"
            onChange={handleFileChange}
            aria-label="finnish"
          /> */}
          <UploadInputContainer>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FileUpload
                id="file-upload"
                type="file"
                accept=".docx,.pdf"
                onChange={handleFileChange}
                aria-label={t('chooseFile')}
              />
              <FileUploadButton htmlFor="file-upload">
                {cvFile ? t('chooseFile') : t('chooseFile')}
              </FileUploadButton>
              <FilenameContainer>
                {cvFile ? cvFile.name : t('noChosenFile')}
              </FilenameContainer>
            </div>
          </UploadInputContainer>
          <UploadButton
            onClick={handleUploadCV}
            disabled={isUploading}
            style={{
              position: 'relative',
            }}
          >
            {isUploading ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spinner />
                {t('uploading')}
              </div>
            ) : (
              t('upload')
            )}
          </UploadButton>
          <LoadingMessageContainer>
            {uploadMessage && <LoadingMessage>{uploadMessage}</LoadingMessage>}
          </LoadingMessageContainer>
        </UploadSection>
      )}
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
            <HeaderItem>
              <DownloadPDFButton resumeInfo={resumeInfo} color="white" />
            </HeaderItem>
          </TemplateHeaderItem>
        </TemplatePreviewHeader>
        <PreviewResumeContainer>
          <ResumeContent>
            <Classic id="default-template" resumeInfo={resumeInfo} />
          </ResumeContent>
        </PreviewResumeContainer>
      </TemplatePreview>
      <AccordionContainer>
        <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle>
              {t('resumeNameInputLabel')}
            </AccordionHeaderTitle>
          </AccordionHeader>
          <InputContainer>
            {editingFilenameId === resumeId ? (
              <Input
                type="text"
                value={newFilename}
                onChange={handleResumeNameChange}
                onBlur={handleResumeNameBlur}
                onKeyDown={handleResumeNameKeyDown}
                autoFocus
              />
            ) : (
              <Input
                type="text"
                value={resumeName}
                onClick={() => {
                  setEditingFilenameId(resumeId);
                  setNewFilename(resumeName);
                }}
                readOnly
              />
            )}
          </InputContainer>
        </AccordionSection>
        <AccordionSection>
          <AccordionHeader>
            <AccordionHeaderTitle>{t('jobAd')}</AccordionHeaderTitle>
            <IconWrapper ref={helpIconRef}>
              <IoMdHelpCircleOutline
                onClick={toggleHelpTooltip}
                style={{ cursor: 'pointer' }}
              />
              {showHelpTooltip && (
                <TooltipContainer ref={tooltipRef}>
                  <p>{t('helpTooltip')}</p>
                </TooltipContainer>
              )}
            </IconWrapper>
          </AccordionHeader>
          <InputContainer>
            <TextArea
              placeholder={t('jobAdPlaceholder')}
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
              {t('basicsTitle')}{' '}
            </AccordionHeaderTitle>
            <span onClick={() => toggleAccordion('basic')}>
              {accordionState.basic ? (
                <IconContainer>
                  <FaCircleChevronUp
                    style={{ fontSize: '24px', color: '#2e033b' }}
                  />
                </IconContainer>
              ) : (
                <IconContainer>
                  <FaCircleChevronDown
                    style={{ fontSize: '24px', color: '#2e033b' }}
                  />
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
              style={{ color: accordionState.educational ? '' : 'gray' }}
              onClick={() => toggleAccordion('educational')}
            >
              {t('educationTitle')}
            </AccordionHeaderTitle>
            <span onClick={() => toggleAccordion('educational')}>
              {accordionState.educational ? (
                <IconContainer style={{ fontSize: '24px', color: '#2e033b' }}>
                  <FaCircleChevronUp />
                </IconContainer>
              ) : (
                <IconContainer style={{ fontSize: '24px', color: '#2e033b' }}>
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
              style={{ color: accordionState.professional ? '' : 'gray' }}
              onClick={() => toggleAccordion('professional')}
            >
              {t('professionalTitle')}
            </AccordionHeaderTitle>
            <span onClick={() => toggleAccordion('professional')}>
              {accordionState.professional ? (
                <IconContainer>
                  <FaCircleChevronUp
                    style={{ fontSize: '24px', color: '#2e033b' }}
                  />
                </IconContainer>
              ) : (
                <IconContainer>
                  <FaCircleChevronDown
                    style={{ fontSize: '24px', color: '#2e033b' }}
                  />
                </IconContainer>
              )}
            </span>
          </AccordionHeader>
          {accordionState.professional && (
            <AccordionContent>
              <ProfessionalDetailsForm
                resumeId={resumeId}
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
              style={{ color: accordionState.skills ? '' : 'gray' }}
              onClick={() => toggleAccordion('skills')}
            >
              {t('skillsTitle')}
            </AccordionHeaderTitle>
            <span onClick={() => toggleAccordion('skills')}>
              {accordionState.skills ? (
                <IconContainer style={{ fontSize: '24px', color: '#2e033b' }}>
                  <FaCircleChevronUp />
                </IconContainer>
              ) : (
                <IconContainer style={{ fontSize: '24px', color: '#2e033b' }}>
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
              {t('languagesTitle')}
            </AccordionHeaderTitle>
            <span onClick={() => toggleAccordion('languages')}>
              {accordionState.languages ? (
                <IconContainer style={{ fontSize: '24px', color: '#2e033b' }}>
                  <FaCircleChevronUp />
                </IconContainer>
              ) : (
                <IconContainer style={{ fontSize: '24px', color: '#2e033b' }}>
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
            <PreviewButton onClick={resumeTemplate}>
              {t('preview')}
            </PreviewButton>
            <CreateProfileButton
              onClick={handleSubmit}
              disabled={isCreatingResume}
              style={{
                backgroundColor: isCreatingResume ? '#494A66' : '#520668',
                cursor: isCreatingResume ? 'not-allowed' : 'pointer',
                position: 'relative',
                padding: '12px 20px',
              }}
            >
              {isCreatingResume ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Spinner />
                  {t('createResume')}
                </div>
              ) : (
                t('createResume')
              )}
            </CreateProfileButton>
          </PreviewButtonSection>
          {showSuccessMessage && (
            <PreviewButtonSection>
              <SuccessAlert>{t('successMessage')} </SuccessAlert>
            </PreviewButtonSection>
          )}
        </AccordionSection>
      </AccordionContainer>
    </Container>
  );
};

export default ResumeForm;
