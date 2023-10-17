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
import { useRouter } from 'next/navigation';

const BuildProfileSection = () => {
  const router = useRouter();

  const handleBuildProfile = () => {
    router.push('/pages/navbar-links/profile/build-profile');
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