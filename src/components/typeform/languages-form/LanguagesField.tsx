import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { capitalizeFirstLetter } from '../../helpers/formHelpers';
import { Language } from '@/types/profile';
import {
  AddMoreLanguage,
  AddMoreLanguageContainer,
  LanguagesFieldContainer,
  Question,
  QuestionContainer,
  TextInput,
  TextInputContainer,
  TextInputItem,
  TrashIcon,
} from './LanguagesField.styles';
import { useTranslations } from 'next-intl';

interface LanguagesFieldProps {
  value: Language[];
  onChange: (value: Language[]) => void;
}

const LanguagesField: React.FC<LanguagesFieldProps> = ({ value, onChange }) => {
  const t = useTranslations('ProfileBuilder');
  const [languages, setLanguages] = useState<Language[]>(() => {
    return value.length > 0 ? value : [{ id: uuidv4(), name: '' }];
  });
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
          <Question>{t('qLanguages')}</Question>
        </QuestionContainer>
        {languages.map(language => (
          <TextInputContainer key={language.id}>
            <TextInputItem>
              <TextInput
                type="text"
                placeholder={t('languagePlaceholder')}
                value={language.name}
                onChange={e =>
                  handleLanguageChange(
                    language.id,
                    capitalizeFirstLetter(e.target.value),
                  )
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
            {t('addLanguage')}
          </AddMoreLanguage>
        </AddMoreLanguageContainer>
      </motion.div>
    </LanguagesFieldContainer>
  );
};

export default LanguagesField;
