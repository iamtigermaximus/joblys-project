import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { Language } from '@/types/profile';
import { breakpoints as bp } from '@/utils/layout';

const LanguagesFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 200px;

  @media (min-width: ${bp.md}) {
    width: 400px;
  }
`;

const QuestionContainer = styled.div`
  padding: 20px 10px;

  @media (min-width: ${bp.md}) {
    width: 100%;
  }
`;

const TextInputContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;
const TextInput = styled.input`
  width: 100%;
  padding: 10px;
  /* margin-bottom: 5px; */
  border: none;
  background-color: #f5f5f5;
  outline: none;
  border-bottom: 0.5px solid gray;

  &:focus {
    border-bottom: 1px solid gray;
  }
`;

const AddMoreLanguageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const AddMoreLanguage = styled.button`
  padding: 10px;
`;

export const TrashIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border: none;
  margin: 0 5px;
  font-size: 14px;
  cursor: pointer;
`;

const TextInputItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface LanguagesFieldProps {
  value: Language[];
  onChange: (value: Language[]) => void;
}

const LanguagesField: React.FC<LanguagesFieldProps> = ({ value, onChange }) => {
  const [languages, setLanguages] = useState<Language[]>(value);

  const handleLanguageChange = (id: string, newValue: string) => {
    const updatedLanguages = languages.map(language => {
      if (language.id === id) {
        return { ...language, name: newValue };
      }
      return language;
    });
    setLanguages(updatedLanguages);
    onChange(updatedLanguages);
  };

  const handleAddLanguage = () => {
    const newLanguage: Language = { id: uuidv4(), name: '' };
    const newLanguages = [...languages, newLanguage];
    setLanguages(newLanguages);
    onChange(newLanguages);
  };

  const handleRemoveLanguage = (id: string) => {
    const updatedLanguages = languages.filter(language => language.id !== id);
    setLanguages(updatedLanguages);
    onChange(updatedLanguages);
  };

  // useEffect(() => {
  //   onChange(languages);
  // }, [languages, onChange]);

  return (
    <LanguagesFieldContainer>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ y: '50vh' }}
        animate={{ y: 0 }}
        transition={{ stiffness: 150 }}
        style={{ width: '100%' }}
      >
        <QuestionContainer>
          <h4>9.Which languages are you fluent in?</h4>
        </QuestionContainer>
        {value.map(language => (
          <TextInputContainer key={language.id}>
            <TextInputItem>
              <TextInput
                type="text"
                placeholder="Language"
                value={language.name}
                onChange={e =>
                  handleLanguageChange(language.id, e.target.value)
                }
              />
              <TrashIcon onClick={() => handleRemoveLanguage(language.id)}>
                <FaTrash />
              </TrashIcon>
            </TextInputItem>
          </TextInputContainer>
        ))}
        <AddMoreLanguageContainer>
          <AddMoreLanguage onClick={handleAddLanguage}>
            Add Language
          </AddMoreLanguage>
        </AddMoreLanguageContainer>
      </motion.div>
    </LanguagesFieldContainer>
  );
};

export default LanguagesField;
