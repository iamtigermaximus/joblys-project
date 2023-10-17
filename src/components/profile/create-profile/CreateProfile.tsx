'use client';

import React from 'react';
import {
  Container,
  CreateProfileContainer,
  PageTitle,
  TitleContainer,
} from './CreateProfile.styles';
import UploadCvSection from './uploadCvSection/UploadCvSection';
import BuildProfileSection from './buildProfileSection/BuildProfileSection';

const CreateProfile = () => {
  return (
    <Container>
      <TitleContainer>
        <PageTitle>Please create your profile</PageTitle>
      </TitleContainer>
      <CreateProfileContainer>
        <UploadCvSection />
        <h4>or</h4>
        <BuildProfileSection />
      </CreateProfileContainer>
    </Container>
  );
};

export default CreateProfile;
