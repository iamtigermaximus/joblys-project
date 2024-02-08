'use client';

import React from 'react';
import {
  Container,
  HeaderContainer,
  PageName,
  CreateResumeButton,
  ResumeContainer,
  ResumeCard,
} from './Resumes.styles';

const Resumes = () => {
  return (
    <Container>
      <HeaderContainer>
        <PageName>Resumes</PageName>
      </HeaderContainer>
      <ResumeContainer>
        <CreateResumeButton>Create new</CreateResumeButton>
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
    </Container>
  );
};

export default Resumes;
