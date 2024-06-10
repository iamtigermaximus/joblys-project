import React from 'react';
import PageHeader from '@/components/common/page-header/PageHeader';
import { Container } from '../../page.styles';
import ProfileBuilder from '@/components/profile/profile-builder/ProfileBuilder';

const ProfileBuilderPage = () => {
  return (
    <Container>
      <div>
        <title>PROFILE BUILDER</title>
      </div>
      {/* <PageHeader /> */}
      <ProfileBuilder />
    </Container>
  );
};

export default ProfileBuilderPage;
