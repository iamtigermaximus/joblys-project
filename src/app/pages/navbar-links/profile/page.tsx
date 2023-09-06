'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Container } from './Profile.styles';
import { useRouter } from 'next/navigation';
// import 'transition-style'; transition-style="in:circle:bottom-right"
import PageHeader from '@/components/page-header/PageHeader';
import Account from '@/components/account/Account';

const Profile = () => {
  const { data: session, status } = useSession({
    required: true,
  });
  const router = useRouter();

  if (!session) {
    router.push('/');
    return null;
  }
  return (
    <div>
      <Container>
        <div>
          <title>HOME</title>
        </div>
        <PageHeader />
        <Account />
      </Container>
    </div>
  );
};

export default Profile;
