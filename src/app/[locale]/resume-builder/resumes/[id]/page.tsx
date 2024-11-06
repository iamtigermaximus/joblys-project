'use client';
import React, { FC, useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import {
  FormViewerContainer,
  ResumeBuilderContainer,
  ResumeFormContainer,
  ResumeTemplateContainer,
} from '../../../page.styles';
import PageHeader from '@/components/common/page-header/PageHeader';
import { Resume, initialResume } from '@/types/resume';
import DefaultTemplate from '@/components/templates/resume/defaultTemplate/DefaultTemplate';
import ResumeForm from '@/components/resumeBuilderForms/resume-form/ResumeForm';
import { Profile } from '@/types/profile';
import Classic from '@/components/templates/resume/classic/Classic';
import { useTranslations } from 'next-intl';

const ResumeBuilderPage: FC = () => {
  const t = useTranslations('ResumesPage');

  const generateResumeInitialName = () => {
    const today = new Date();
    const date = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    const prefix = t('resumeNamePlaceholderPrefix');
    return `${prefix} ${date}/${month}/${year} ${hours}:${minutes}`;
  };

  const params = useParams() as { id: string };
  const [resumeName, setResumeName] = useState(generateResumeInitialName());
  const [resumeInfo, setResumeInfo] = useState(initialResume());
  const [existingData, setExistingData] = useState<Profile | null>(null);

  const handleStoredResumeUpdate = useCallback(async () => {
    const response = await fetch(`/api/cv/${params.id}`);
    if (response.status !== 200) {
      return;
    }
    const responseJson = await response.json();
    const resumeProfile: Resume | undefined = responseJson.body.profile;

    if (resumeProfile) {
      setResumeInfo(resumeProfile);
    }

    const name = responseJson.body.name;
    if (name) {
      setResumeName(name);
    }
  }, [params.id]);

  useEffect(() => {
    handleStoredResumeUpdate();
  }, [handleStoredResumeUpdate]);

  return (
    <ResumeBuilderContainer>
      <div>
        <title>Resume Builder Page</title>
      </div>
      <PageHeader id={params.id} resumeInfo={resumeInfo} />
      <FormViewerContainer>
        <ResumeFormContainer>
          <ResumeForm
            resumeId={params.id}
            resumeName={resumeName}
            setResumeName={setResumeName}
            resumeInfo={resumeInfo}
            setResumeInfo={setResumeInfo}
            refreshStoredResume={handleStoredResumeUpdate}
            existingData={existingData}
            setExistingData={setExistingData}
          />
        </ResumeFormContainer>
        <ResumeTemplateContainer>
          <Classic id="default-template" resumeInfo={resumeInfo} />
        </ResumeTemplateContainer>
      </FormViewerContainer>
    </ResumeBuilderContainer>
  );
};

export default ResumeBuilderPage;
