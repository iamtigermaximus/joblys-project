'use client';

import React, { useEffect } from 'react';
// import 'transition-style'; transition-style="in:circle:bottom-right"
import PageHeader from '@/components/page-header/PageHeader';
import { Container } from '@/app/page.styles';
import Profile from '@/components/profile/Profile';

const ProfilePage = () => {
  return (
    <div>
      <Container>
        <div>
          <title>PROFILE</title>
        </div>
        <PageHeader />
        <Profile />
      </Container>
    </div>
  );
};

export default ProfilePage;
