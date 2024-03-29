import React from 'react';
import {
  BuildProfileButton,
  CreateProfileSection,
  InputContainer,
  ProfileBuildSection,
  SectionSubTitle,
  SectionTitle,
  SectionTitleContainer,
} from './BuildProfileSection.styles';
import { initialResume } from '@/types/profile';
import { useRouter } from 'next/navigation';

const BuildProfileSection = () => {
  const router = useRouter();

  const handleBuildProfile = async () => {
    try {
      const response = await fetch('/api/cv/upload', {
        method: 'POST',
        body: JSON.stringify({ resume: initialResume() }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload resume');
      }

      const respJson = await response.json();
      const id = respJson?.body?.id;
      if (!id) {
        throw new Error('Did not receive resume id from server');
      }

      router.push(`/profile-builder/resumes/${id}`);
    } catch (error: any) {
      console.error('Error uploading resume:', error.message);
    }
  };

  return (
    <CreateProfileSection>
      <SectionTitleContainer>
        <SectionTitle>Build your profile</SectionTitle>
      </SectionTitleContainer>
      <ProfileBuildSection>
        <SectionSubTitle>Create your profile in Joblys</SectionSubTitle>
        <InputContainer>
          <BuildProfileButton onClick={handleBuildProfile}>
            Build Profile
          </BuildProfileButton>
        </InputContainer>
      </ProfileBuildSection>
    </CreateProfileSection>
  );
};

export default BuildProfileSection;
