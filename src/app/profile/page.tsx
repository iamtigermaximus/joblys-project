'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Container } from './Profile.styles';

const Profile = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === 'loading') {
    return <></>;
  }
  return (
    <Container>
      <div>
        <title>HOME</title>
      </div>
      This is the page where user can create an account profile.(create resume
      with resume builder or upload a resume)
    </Container>
  );
};

export default Profile;
