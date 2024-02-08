import React from 'react';
import { Container } from '../page.styles';
import PageHeader from '@/components/common/page-header/PageHeader';
import CoverLetters from '@/components/coverletters/CoverLetters';

const CoverLetter = () => {
  return (
    <Container>
      <div>
        <title>COVER LETTERS</title>
      </div>
      {/* <PageHeader /> */}
      <CoverLetters />
    </Container>
  );
};

export default CoverLetter;
