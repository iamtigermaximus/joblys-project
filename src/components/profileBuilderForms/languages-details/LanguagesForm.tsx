'use client';

import { ResumeInfoType, SkillType } from '@/types/profile';
import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  AddButton,
  AddNewLanguageContainer,
  Container,
  DoneButton,
  Input,
  InputContainer,
  InputLabel,
  LanguagesDetailsContainer,
  TrashIcon
} from './LanguagesForm.styles';
import { FaTrash } from 'react-icons/fa';

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
      <LanguagesDetailsContainer>
        <InputContainer>
          <InputLabel>Language:</InputLabel>
          <Input
            type="text"
            placeholder="eg. English"
            // value={resumeInfo.skills.skill}
            // onChange={e => handleInputChange('email', e.target.value)}
          />
          <AddNewLanguageContainer>
            <TrashIcon>
              <FaTrash />
            </TrashIcon>
            <DoneButton>Done</DoneButton>
          </AddNewLanguageContainer>
          <AddButton>Add new language</AddButton>
        </InputContainer>
      </LanguagesDetailsContainer>
    </Container>
  );
};

export default LanguagesForm;
