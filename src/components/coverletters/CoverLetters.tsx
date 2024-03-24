'use client';
import React from 'react';
import { Container, HeaderContainer, PageName } from './CoverLetters.styles';
import CoverLetterPreview from '../templates/coverletterTemplate/CoverLetterPreview';

const CoverLetters = () => {
  return (
    <Container>
      <HeaderContainer>
        <PageName>Cover Letters</PageName>
      </HeaderContainer>
      <CoverLetterPreview />
    </Container>
  );
};
export default CoverLetters;
