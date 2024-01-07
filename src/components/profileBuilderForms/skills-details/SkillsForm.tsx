'use client';

import { ResumeInfoType, SkillType } from '@/types/profile';
import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  AddButton,
  AddNewSkillContainer,
  Container,
  DoneButton,
  Input,
  InputContainer,
  InputLabel,
  SkillsDetailsContainer,
  TrashIcon
} from './SkillForm.styles';
import { FaTrash } from 'react-icons/fa';

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
      <SkillsDetailsContainer>
        <InputContainer>
          <InputLabel>Skill:</InputLabel>
          <Input
            type="text"
            placeholder="eg. Javascript"
            // value={resumeInfo.skills.skill}
            // onChange={e => handleInputChange('email', e.target.value)}
          />
          <AddNewSkillContainer>
            <TrashIcon>
              <FaTrash />
            </TrashIcon>
            <DoneButton>Done</DoneButton>
          </AddNewSkillContainer>
          <AddButton>Add new skill</AddButton>
        </InputContainer>
      </SkillsDetailsContainer>
    </Container>
  );
};

export default SkillsForm;
