'use client';

import React from 'react';
import { Container } from '../../page.styles';
import SignUpForm from './form';
import PageHeader from '@/components/page-header/PageHeader';

const SignUp = () => {
  return (
    <Container>
      <PageHeader />
      <SignUpForm />
    </Container>
  );
};

export default SignUp;
