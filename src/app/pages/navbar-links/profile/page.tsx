'use client';

import React from 'react';
import PageHeader from '@/components/page-header/PageHeader';
import { Container } from '@/app/page.styles';
import CreateProfile from '@/components/create-profile/CreateProfile';

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
