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
import { v4 as uuidv4 } from 'uuid';

interface LanguagesFormProps {
  resumeInfo: { languages: { language: SkillType[] } };
  setResumeInfo: Dispatch<SetStateAction<ResumeInfoType>>;
}

const LanguagesForm: FC<LanguagesFormProps> = ({
  resumeInfo,
  setResumeInfo
}) => {
  const handleInputChange = (id: string, value: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      languages: {
        ...prevInfo.languages,
        language: prevInfo.languages.language.map(enteredLanguage =>
          enteredLanguage.id === id
            ? { ...enteredLanguage, name: value }
            : enteredLanguage
        )
      }
    }));
  };
  const handleAddMoreLanguages = () => {
    const newId = uuidv4();
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      languages: {
        ...prevInfo.languages,
        language: [...prevInfo.languages.language, { id: newId, name: '' }]
      }
    }));
  };

  const handleDeleteLanguage = (id: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      languages: {
        ...prevInfo.languages,
        language: prevInfo.languages.language.filter(
          language => language.id !== id
        )
      }
    }));
  };
  return (
    <Container>
      <LanguagesDetailsContainer>
        {resumeInfo.languages.language.map(enteredLanguage => (
          <InputContainer key={enteredLanguage.id}>
            <InputLabel>Language:</InputLabel>
            <AddNewLanguageContainer>
              <Input
                type="text"
                placeholder="eg. Javascript"
                value={enteredLanguage.name}
                onChange={e =>
                  handleInputChange(enteredLanguage.id, e.target.value)
                }
              />
              <TrashIcon
                onClick={() => handleDeleteLanguage(enteredLanguage.id)}
              >
                <FaTrash />
              </TrashIcon>
            </AddNewLanguageContainer>
          </InputContainer>
        ))}
        <AddButton onClick={handleAddMoreLanguages}>Add new language</AddButton>
      </LanguagesDetailsContainer>
    </Container>
  );
};

export default LanguagesForm;
