'use client';

import React from 'react';
import PageHeader from '@/components/page-header/PageHeader';
import { Container } from '@/app/page.styles';
import BuildProfile from '@/components/build-profile/BuildProfile';

const BuildProfilePage = () => {
  return (
    <Container>
      <div>
        <title>BUILD PROFILE</title>
      </div>
      <PageHeader />
      <BuildProfile />
    </Container>
  );
};

export default BuildProfilePage;
