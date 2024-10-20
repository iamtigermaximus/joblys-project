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
import { initialResume } from '@/types/resume';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const BuildProfileSection = () => {
  const t = useTranslations('ProfileBuilder');
  const router = useRouter();

  const handleBuildProfile = async () => {
    try {
      // const response = await fetch('/api/cv/upload', {
      //   method: 'POST',
      //   body: JSON.stringify({ resume: initialResume() }),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to upload resume');
      // }

      // const respJson = await response.json();
      // const id = respJson?.body?.id;
      // if (!id) {
      //   throw new Error('Did not receive resume id from server');
      // }

      router.push(`/eazyCV/profile/profile-builder`);
    } catch (error: any) {
      console.error('Error uploading resume:', error.message);
    }
  };

  return (
    <CreateProfileSection>
      <SectionTitleContainer>
        <SectionTitle>{t('buildProfileTitle')}</SectionTitle>
      </SectionTitleContainer>
      <ProfileBuildSection>
        <SectionSubTitle>{t('createProfileTitle')}</SectionSubTitle>
        <InputContainer>
          <BuildProfileButton onClick={handleBuildProfile}>
            {t('buildProfileButton')}
          </BuildProfileButton>
        </InputContainer>
      </ProfileBuildSection>
    </CreateProfileSection>
  );
};

export default BuildProfileSection;
