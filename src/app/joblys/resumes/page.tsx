'use client';

import React from 'react';
import { Container } from '../page.styles';
import PageHeader from '@/components/common/page-header/PageHeader';
// import Resumes from '@/components/resumes/CreateProfile';
import { useCv } from '../context';

const ResumesPage = () => {
  const { cv, setCv } = useCv();
  console.log('cv from context', cv);
  
  return (
    <Container>
      <div>
        <title>CV/RESUME</title>
      </div>
      <PageHeader />
      {/* <Resumes /> */}
      <div>CV / RESUMES</div>
    </Container>
  );
};

export default ResumesPage;
