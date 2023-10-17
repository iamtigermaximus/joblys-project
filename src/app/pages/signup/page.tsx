'use client';

import React from 'react';
import { Container } from '../../page.styles';
import SignUpForm from './form';
import PageHeader from '@/components/common/page-header/PageHeader';

const SignUp = () => {
  return (
    <Container>
      <div>
        <title>REGISTER</title>
      </div>
      <PageHeader />
      <SignUpForm />
    </Container>
  );
};

export default SignUp;
