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

const ResumeBuilderPage: FC = () => {
  const params = useParams() as { id: string };
  const [resumeInfo, setResumeInfo] = useState(initialResume());
  const [existingData, setExistingData] = useState<Profile | null>(null);

  const handleStoredResumeUpdate = useCallback(async () => {
    const response = await fetch(`/api/cv/${params.id}`);
    if (response.status !== 200) {
      return;
    }
    const responseJson = await response.json();
    const resumeProfile: Resume | undefined = responseJson.body.profile;

    if (!resumeProfile) {
      return;
    }

    setResumeInfo(resumeProfile);
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