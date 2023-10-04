import React from 'react';
import { Container } from '@/app/page.styles';
import PageHeader from '@/components/page-header/PageHeader';
import Resumes from '@/components/resumes/Resumes';

const ResumesPage = () => {
  return (
    <Container>
      <div>
        <title>CV/RESUME</title>
      </div>
      <PageHeader />
      <Resumes />
    </Container>
  );
};

export default ResumesPage;
