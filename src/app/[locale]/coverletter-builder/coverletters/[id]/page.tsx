'use client';
import React, { FC, useEffect, useState, useCallback } from 'react';
import {
  FormViewerContainer,
  CoverletterBuilderContainer,
  ResumeFormContainer,
  ResumeTemplateContainer,
  CoverletterContentContainer,
} from '../../../page.styles';
import PageHeader from '@/components/common/page-header/PageHeader';
import {
  BasicInfoType,
  EducationType,
  LanguageType,
  ProfessionalExperienceType,
  Resume,
  SkillType,
} from '@/types/resume';
import { useParams } from 'next/navigation';
import CoverLetterForm from '@/components/coverletters/coverLettersForm/CoverLetterForm';
import CoverLetterTemplate from '@/components/templates/coverletter/coverletterTemplate/CoverLetterTemplate';
import { Coverletter } from '@/types/coverletter';
import { useTranslations } from 'next-intl';

const CoverLetterBuilderPage: FC = () => {
  const params = useParams() as { id: string };
  const t = useTranslations('CoverlettersPage');

  const generateCoverletterInitialName = () => {
    const today = new Date();
    const date = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    const prefix = t('coverletterNamePlaceholderPrefix');
    return `${prefix} ${date}/${month}/${year} ${hours}:${minutes}`;
  };

  const initialBasicInfo: BasicInfoType = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    linkedin: '',
    additionalLinks: [],
  };

  const initialProfessionalExperience: ProfessionalExperienceType[] = [
    {
      id: '',
      jobTitle: '',
      company: '',
      startDate: { month: '', year: '' },
      endDate: { month: '', year: '' },
      jobDetails: '',
    },
  ];

  const initialEducation: EducationType[] = [
    {
      id: '',
      school: '',
      course: '',
      startDate: { month: '', year: '' },
      endDate: { month: '', year: '' },
      description: '',
    },
  ];

  const initialSkills: SkillType[] = [
    {
      id: '',
      name: '',
    },
  ];

  const initialLanguages: LanguageType[] = [
    {
      id: '',
      name: '',
    },
  ];

  const initialState: Resume = {
    id: '',
    basic: initialBasicInfo,
    professional: {
      summary: '',
      currentRole: '',
      work: initialProfessionalExperience,
    },
    educational: initialEducation,
    skills: initialSkills,
    languages: initialLanguages,
  };

  const [resumeInfo, setResumeInfo] = useState(initialState);
  const [coverletterName, setCoverletterName] = useState<string>(
    generateCoverletterInitialName(),
  );
  const [coverletter, setCoverletter] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [resumeId, setResumeId] = useState<string>('');

  const handleStoredResumeUpdate = useCallback(async () => {
    try {
      const response = await fetch(`/api/coverletter/${params.id}`);
      if (response.status === 200) {
        const responseJson = await response.json();
        console.log('API Response:', responseJson);
        const coverletter: string | undefined = responseJson.body.profile;
        const name: string | undefined = responseJson.body.name;
        const jobDescription: string | undefined =
          responseJson.body.jobDescription;
        const resumeId: string | undefined = responseJson.body.resumeId;

        if (coverletter) {
          setCoverletter(coverletter);
        }

        if (name) {
          setCoverletterName(name);
        }

        if (jobDescription) {
          setJobDescription(jobDescription);
        }

        if (resumeId) {
          setResumeId(resumeId);
        }
      } else {
        console.error('Failed to fetch cover letter details');
      }
    } catch (error) {
      console.error('Error fetching cover letter details:', error);
    }
  }, [params.id]);

  useEffect(() => {
    handleStoredResumeUpdate();
  }, [handleStoredResumeUpdate]);

  const coverLetterInfo: Coverletter = {
    id: params.id,
    name: coverletterName,
    content: coverletter,
    resumeId: resumeId,
    jobDescription: jobDescription,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <CoverletterBuilderContainer>
      <div>
        <title>Cover Letter Builder Page</title>
      </div>
      <PageHeader
        id={params.id}
        resumeInfo={resumeInfo}
        coverLetterInfo={coverLetterInfo}
      />
      <FormViewerContainer>
        <ResumeFormContainer>
          <CoverLetterForm
            coverletterId={params.id}
            name={coverletterName}
            setName={setCoverletterName}
            resumeInfo={resumeInfo}
            setResumeInfo={setResumeInfo}
            refreshStoredResume={handleStoredResumeUpdate}
            content={coverletter}
            resumeId={resumeId}
            jobDescription={jobDescription}
          />
        </ResumeFormContainer>
        <ResumeTemplateContainer>
          <CoverletterContentContainer>
            <CoverLetterTemplate content={coverletter} />
          </CoverletterContentContainer>
        </ResumeTemplateContainer>
      </FormViewerContainer>
    </CoverletterBuilderContainer>
  );
};

export default CoverLetterBuilderPage;
