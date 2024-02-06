'use client';

import React from 'react';
import PageHeader from '@/components/common/page-header/PageHeader';
import { Container } from '../../page.styles';
import BuildProfile from '@/components/profile/build-profile/BuildProfile';

const BuildProfilePage = () => {
  return (
    <Container>
      <div>
        <title>BUILD PROFILE</title>
      </div>
      {/* <PageHeader /> */}
      <BuildProfile />
    </Container>
  );
};

export default BuildProfilePage;
