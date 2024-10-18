import React from 'react';
import { Container } from '../page.styles';
import Resumes from '@/components/resumes/Resumes';

const ResumesPage = () => {
  return (
    <Container>
      <div>
        <title>CV/RESUME</title>
      </div>
      <Resumes />
    </Container>
  );
};

export default ResumesPage;
