import React from 'react';
import { Container } from '../page.styles';
import PageHeader from '@/components/common/page-header/PageHeader';
import Resumes from '@/components/resumes/Resumes';
// import Resumes from '@/components/resumes/CreateProfile';

const ResumesPage = () => {
  return (
    <Container>
      <div>
        <title>CV/RESUME</title>
      </div>
      {/* <PageHeader /> */}
      {/* <Resumes /> */}
      <Resumes />
    </Container>
  );
};

export default ResumesPage;
