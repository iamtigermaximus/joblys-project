'use client';

import React from 'react';
import {
  ButtonLabel,
  Container,
  CoverLetterCard,
  CoverLetterContainer,
  CreateCoverLetterButton,
  HeaderContainer,
  PageName,
} from './CoverLetters.styles';
import { useRouter } from 'next/navigation';

const CoverLetters = () => {
  const router = useRouter();

  const handleCreateNewCoverLetter = () => {
    router.push('/coverletter-builder');
  };
  return (
    <Container>
      <HeaderContainer>
        <PageName>Cover Letters</PageName>
      </HeaderContainer>
      <CoverLetterContainer>
        <CreateCoverLetterButton>
          <ButtonLabel onClick={handleCreateNewCoverLetter}>
            Create new cover letter
          </ButtonLabel>
        </CreateCoverLetterButton>
        <CoverLetterCard>Cover letter 1</CoverLetterCard>
        <CoverLetterCard>Cover letter 2</CoverLetterCard>
        <CoverLetterCard>Cover letter 3</CoverLetterCard>
        <CoverLetterCard>Cover letter 4</CoverLetterCard>
        <CoverLetterCard>Cover letter 5</CoverLetterCard>
        <CoverLetterCard>Cover letter 6</CoverLetterCard>
        <CoverLetterCard>Cover letter 7</CoverLetterCard>
        <CoverLetterCard>Cover letter 8</CoverLetterCard>
        <CoverLetterCard>Cover letter 9</CoverLetterCard>
        <CoverLetterCard>Cover letter 10</CoverLetterCard>
      </CoverLetterContainer>
    </Container>
  );
};
export default CoverLetters;
