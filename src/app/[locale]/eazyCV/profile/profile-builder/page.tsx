import React from 'react';
import { Container } from '../../page.styles';
import ProfileBuilder from '@/components/profile/profile-builder/ProfileBuilder';

const ProfileBuilderPage = () => {
  return (
    <Container>
      <div>
        <title>PROFILE BUILDER</title>
      </div>
      <ProfileBuilder />
    </Container>
  );
};

export default ProfileBuilderPage;
