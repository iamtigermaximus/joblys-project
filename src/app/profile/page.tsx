'use client';

import React from 'react';
import { Container } from '../page.styles';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === 'loading') {
    return <></>;
  }
  return <Container>Profile PAGE This is a protected page.</Container>;
};

export default Profile;
