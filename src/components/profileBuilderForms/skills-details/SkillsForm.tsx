'use client';

import { ResumeInfoType, SkillType } from '@/types/profile';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { Container, SkillsDetailsContainer } from './SkillForm.styles';

interface SkillsFormProps {
  resumeInfo: { skills: { skill: SkillType[] } };
  setResumeInfo: Dispatch<SetStateAction<ResumeInfoType>>;
}

const SkillsForm: FC<SkillsFormProps> = ({
  resumeInfo,
  setResumeInfo
  // setPage,
}) => {
  return (
    <Container>
      <SkillsDetailsContainer>SkillsForm</SkillsDetailsContainer>
    </Container>
  );
};

export default SkillsForm;
