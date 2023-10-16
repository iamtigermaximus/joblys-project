'use client';

import React from 'react';
import { Container, CreateProfileContainer } from './CreateProfile.style';
import UploadCvSection from './uploadCvSection/UploadCvSection';
import BuildProfileSection from './buildProfileSection/BuildProfileSection';

const CreateProfile = () => {
  return (
    <Container>
      <CreateProfileContainer>
        <UploadCvSection />
        <BuildProfileSection />
      </CreateProfileContainer>
    </Container>
  );
};

export default CreateProfile;
