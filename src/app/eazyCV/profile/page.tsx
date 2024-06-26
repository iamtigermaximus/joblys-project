import React from 'react';
import { Container } from '../page.styles';
import CreateProfile from '@/components/profile/create-profile/CreateProfile';

const ProfilePage = () => {
  return (
    <Container>
      <div>
        <title>PROFILE</title>
      </div>
      <CreateProfile />
    </Container>
  );
};

export default ProfilePage;
