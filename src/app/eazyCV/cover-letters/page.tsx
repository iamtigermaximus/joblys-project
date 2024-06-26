import React from 'react';
import { Container } from '../page.styles';
import CoverLetters from '@/components/coverletters/CoverLetters';

const CoverLetter = () => {
  return (
    <Container>
      <div>
        <title>COVER LETTERS</title>
      </div>
      <CoverLetters />
    </Container>
  );
};

export default CoverLetter;
