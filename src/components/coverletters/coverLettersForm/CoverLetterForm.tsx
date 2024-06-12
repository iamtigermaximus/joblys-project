'use client';

import React, { useEffect, useState } from 'react';

import { Resume } from '@/types/profile';
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
} from './CoverLetterForm.styles';
import { FaArrowLeft, FaDownload } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import ResumesDropdown from '@/components/resumes/ResumesDropdown';
import CoverLetterTemplate from '@/components/templates/coverletter/coverletterTemplate/CoverLetterTemplate';
import MiniCoverLetterTemplate from '@/components/templates/coverletter/coverletterTemplate/MiniCoverLetterTemplate';

interface CoverLetterFormProps {
  coverletterId: string;
  resumeInfo: Resume;
  setResumeInfo: React.Dispatch<React.SetStateAction<Resume>>;
  refreshStoredResume: () => void;
  content: string;
}

const CoverLetterForm: React.FC<CoverLetterFormProps> = ({
  coverletterId,
  resumeInfo,
  setResumeInfo,
  refreshStoredResume,
  content,
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
  const [resumeId, setResumeId] = useState('');

  const [profileData, setProfileData] = useState<
    | { id: string; createdAt: string; updatedAt: string; resumeInfo: Resume }[]
    | null
  >(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('/api/cv');
        const resumes = response.data.body.resumes;

        const data = resumes.map(
          (resume: {
            id: string;
            content: any;
            createdAt: string;
            updatedAt: string;
          }) => {
            return {
              id: resume.id,
              resumeInfo: resume.content,
              createdAt: resume.createdAt,
              updatedAt: resume.updatedAt,
            };
          },
        );
        setProfileData(data);
        console.log('DATA', data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchProfileData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>No profile data available</div>;
  }

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

  const handleSubmitWriteCoverletter = async () => {
    try {
      const response = await fetch('/api/coverletterChanges', {
        method: 'POST',
        body: JSON.stringify({
          coverletterId: coverletterId,
          resumeId: resumeId,
          jobDescription: applyJobDescription,
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
            <AccordionHeaderTitle>Resumes</AccordionHeaderTitle>
          </AccordionHeader>
        </AccordionSection>

        <ResumesDropdown
          resumes={profileData}
          setSelectedResumeId={setResumeId}
        />

        <AccordionSection>
          <PreviewButtonSection>
            <PreviewButton onClick={resumeTemplate}>Preview</PreviewButton>
            <GenerateButton onClick={handleSubmitWriteCoverletter}>
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
        </AccordionSection>
      </AccordionContainer>
    </Container>
  );
};

export default CoverLetterForm;
