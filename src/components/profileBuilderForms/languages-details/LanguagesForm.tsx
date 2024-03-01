'use client';

import { Resume, ResumeInfoType, SkillType } from '@/types/profile';
import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  AddButton,
  AddNewLanguageContainer,
  Container,
  Input,
  InputContainer,
  InputLabel,
  LanguagesDetailsContainer,
  TrashIcon,
} from './LanguagesForm.styles';
import { FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

interface LanguagesFormProps {
  resumeInfo: { languages: { language: SkillType[] } };
  setResumeInfo: Dispatch<SetStateAction<Resume>>;
}

const LanguagesForm: FC<LanguagesFormProps> = ({
  resumeInfo,
  setResumeInfo,
}) => {
  const handleInputChange = (id: string, value: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      languages: {
        ...prevInfo.languages,
        language: prevInfo.languages.language.map(enteredLanguage =>
          enteredLanguage.id === id
            ? { ...enteredLanguage, name: value }
            : enteredLanguage,
        ),
      },
    }));
  };
  const handleAddMoreLanguages = () => {
    const newId = uuidv4();
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      languages: {
        ...prevInfo.languages,
        language: [...prevInfo.languages.language, { id: newId, name: '' }],
      },
    }));
  };

  const handleDeleteLanguage = (id: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      languages: {
        ...prevInfo.languages,
        language: prevInfo.languages.language.filter(
          language => language.id !== id,
        ),
      },
    }));
  };

  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
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
                placeholder="eg. Finnish"
                value={enteredLanguage.name}
                onChange={e =>
                  handleInputChange(
                    enteredLanguage.id,
                    capitalizeFirstLetter(e.target.value),
                  )
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
        <AddNewLanguageContainer>
          <AddButton onClick={handleAddMoreLanguages}>
            Add new language
          </AddButton>
        </AddNewLanguageContainer>
      </LanguagesDetailsContainer>
    </Container>
  );
};

export default LanguagesForm;
