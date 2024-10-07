'use client';

import { LanguageType, Resume } from '@/types/resume';
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
import { capitalizeFirstLetter } from '@/components/helpers/formHelpers';

interface LanguagesFormProps {
  languages: LanguageType[];
  setResumeInfo: Dispatch<SetStateAction<Resume>>;
}

const LanguagesForm: FC<LanguagesFormProps> = ({
  languages,
  setResumeInfo,
}) => {
  const handleInputChange = (id: string, value: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      languages: prevInfo.languages.map(enteredLanguage =>
        enteredLanguage.id === id
          ? { ...enteredLanguage, name: value }
          : enteredLanguage,
      ),
    }));
  };

  const handleAddMoreLanguages = () => {
    const newId = uuidv4();
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      languages: [...prevInfo.languages, { id: newId, name: '' }],
    }));
  };

  const handleDeleteLanguage = (id: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      languages: prevInfo.languages.filter(language => language.id !== id),
    }));
  };

  return (
    <Container>
      <LanguagesDetailsContainer>
        <InputLabel>Language:</InputLabel>
        {languages.map(enteredLanguage => (
          <InputContainer key={enteredLanguage.id}>
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
                <FaTrash style={{ color: '#2e033b' }} />
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
