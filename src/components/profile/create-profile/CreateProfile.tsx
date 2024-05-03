'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  CreateProfileContainer,
  PageTitle,
  ProfileFormContainer,
  TitleContainer,
} from './CreateProfile.styles';
import UploadCvSection from './uploadCvSection/UploadCvSection';
import BuildProfileSection from './buildProfileSection/BuildProfileSection';
import { useParams } from 'next/navigation';
import { Resume, initialResume } from '@/types/profile';
import ProfileForm from '@/components/profileBuilderForms/profile-form/ProfileForm';

const CreateProfile = () => {
  const params = useParams() as { id: string };
  const [resumeInfo, setResumeInfo] = useState(initialResume());
  const [existingData, setExistingData] = useState(false);
  const [recentResume, setRecentResume] = useState<Resume | null>(null);

  const fetchRecentResume = useCallback(async () => {
    try {
      const response = await fetch(`/api/cv`);
      if (!response.ok) {
        throw new Error('Failed to fetch recent resume data');
      }
      const recentResumeData: Resume = await response.json();
      setRecentResume(recentResumeData);
    } catch (error) {
      console.error('Error fetching recent resume data:', error);
    }
  }, []);

  const handleStoredResumeUpdate = useCallback(async () => {
    const response = await fetch(`/api/cv/${params.id}`);
    if (response.status !== 200) {
      setExistingData(false);
      return;
    }
    const responseJson = await response.json();
    const resumeProfile: Resume | undefined = responseJson.body.profile;

    if (!resumeProfile) {
      setExistingData(false);
      return;
    }

    setResumeInfo(resumeProfile);
    setExistingData(true);
  }, [params.id]);

  useEffect(() => {
    fetchRecentResume();

    handleStoredResumeUpdate();
  }, [handleStoredResumeUpdate]);

  return (
    <Container>
      {existingData ? (
        <ProfileFormContainer>
          <ProfileForm
            resumeId={params.id}
            resumeInfo={recentResume || resumeInfo}
            setResumeInfo={setResumeInfo}
            refreshStoredResume={handleStoredResumeUpdate}
          />
        </ProfileFormContainer>
      ) : (
        <>
          <TitleContainer>
            <PageTitle>Please create your profile</PageTitle>
          </TitleContainer>
          <CreateProfileContainer>
            <UploadCvSection />
            <h4>or</h4>
            <BuildProfileSection />
          </CreateProfileContainer>
        </>
      )}
    </Container>
  );
};

export default CreateProfile;
