'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Container } from './Profile.styles';
import { useRouter } from 'next/navigation';

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
    <Container>
      <div>
        <title>HOME</title>
      </div>
      <h1>ACCOUNT PROFILE</h1>
      This is the page where user can edit and see your account profile.(create
      resume with resume builder or upload a resume)
    </Container>
  );
};

export default Profile;
