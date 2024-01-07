'use client';

import { ResumeInfoType, SkillType } from '@/types/profile';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { Container, LanguagesDetailsContainer } from './LanguagesForm.styles';

interface LanguagesFormProps {
  resumeInfo: { languages: { language: SkillType[] } };
  setResumeInfo: Dispatch<SetStateAction<ResumeInfoType>>;
}

const LanguagesForm: FC<LanguagesFormProps> = ({
  resumeInfo,
  setResumeInfo
  // setPage,
}) => {
  return (
    <Container>
      <LanguagesDetailsContainer>LanguagesForm</LanguagesDetailsContainer>
    </Container>
  );
};

export default LanguagesForm;
