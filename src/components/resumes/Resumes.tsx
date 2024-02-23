'use client';

import React from 'react';
import {
  Container,
  HeaderContainer,
  PageName,
  CreateResumeButton,
  ResumeContainer,
  ResumeCard,
  ButtonLabel,
  OuterContainer,
} from './Resumes.styles';
import { useRouter } from 'next/navigation';

const Resumes = () => {
  const router = useRouter();

  const handleCreateNewResume = () => {
    router.push('/profile-builder');
  };
  return (
    <Container>
      <HeaderContainer>
        <PageName>Resumes</PageName>
      </HeaderContainer>
      <OuterContainer>
        <ResumeContainer>
          <CreateResumeButton>
            <ButtonLabel onClick={handleCreateNewResume}>
              Create new resume
            </ButtonLabel>
          </CreateResumeButton>
          <ResumeCard>Resume 1</ResumeCard>
          <ResumeCard>Resume 2</ResumeCard>
          <ResumeCard>Resume 3</ResumeCard>
          <ResumeCard>Resume 4</ResumeCard>
          <ResumeCard>Resume 5</ResumeCard>
          <ResumeCard>Resume 6</ResumeCard>
          <ResumeCard>Resume 7</ResumeCard>
          <ResumeCard>Resume 8</ResumeCard>
          <ResumeCard>Resume 9</ResumeCard>
          <ResumeCard>Resume 10</ResumeCard>
        </ResumeContainer>
      </OuterContainer>
    </Container>
  );
};

export default Resumes;
