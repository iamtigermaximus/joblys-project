'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Container } from './Profile.styles';
import { useRouter } from 'next/navigation';
// import 'transition-style'; transition-style="in:circle:bottom-right"
import PageHeader from '@/components/page-header/PageHeader';
import Account from '@/components/account/Account';

const Profile = () => {
  return (
    <div>
      <Container>
        <div>
          <title>PROFILE</title>
        </div>
        <PageHeader />
        <Account />
      </Container>
    </div>
  );
};

export default Profile;
