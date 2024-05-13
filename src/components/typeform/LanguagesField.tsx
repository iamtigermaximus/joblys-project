import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Language {
  id: number;
  name: string;
}

const LanguagesFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  min-height: 200px;
`;

const QuestionContainer = styled.div`
  width: 100%;
  padding: 20px 10px;
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

const LanguagesField: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([
    {
      id: 1,
      name: '',
    },
  ]);

  const handleAddLanguage = () => {
    const newId = languages.length + 1;
    setLanguages([
      ...languages,
      {
        id: newId,
        name: '',
      },
    ]);
  };

  const handleChange = (id: number, value: string) => {
    setLanguages(
      languages.map(language =>
        language.id === id ? { ...language, name: value } : language,
      ),
    );
  };

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
        {languages.map(language => (
          <TextInputContainer key={language.id}>
            <TextInput
              type="text"
              placeholder="Language"
              value={language.name}
              onChange={e => handleChange(language.id, e.target.value)}
            />
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
