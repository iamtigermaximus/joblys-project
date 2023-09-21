'use client';

import React, { useEffect } from 'react';
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

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  if (!session) {
    return null; // You can return null here, or render a loading message, etc.
  }

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
