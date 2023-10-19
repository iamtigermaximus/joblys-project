'use client';

import React from 'react';
import PageHeader from '@/components/common/page-header/PageHeader';
import { Container } from '../page.styles';
import CreateProfile from '@/components/profile/create-profile/CreateProfile';
// import Profile from '@/components/profile/Profile';

const ProfilePage = () => {
  return (
    <Container>
      <div>
        <title>CREATE PROFILE</title>
      </div>
      <PageHeader />
      <CreateProfile />
    </Container>
  );
};

export default ProfilePage;
