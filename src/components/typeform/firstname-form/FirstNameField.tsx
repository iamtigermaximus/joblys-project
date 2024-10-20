import React, { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { capitalizeFirstLetter } from '../../helpers/formHelpers';
import {
  FormContainer,
  Question,
  QuestionContainer,
  TextInput,
  TextInputContainer,
} from './FirstNameField.styles';
import { useTranslations } from 'next-intl';

interface FirstNameFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const FirstNameField: React.FC<FirstNameFieldProps> = ({ value, onChange }) => {
  const t = useTranslations('ProfileBuilder');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(capitalizeFirstLetter(e.target.value));
  };
  return (
    <FormContainer autoComplete="off">
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ y: '50vh' }}
        animate={{ y: 0 }}
        transition={{ stiffness: 150 }}
        style={{ width: '100%' }}
      >
        <QuestionContainer>
          <Question>{t('qFirstname')}</Question>
        </QuestionContainer>
        <TextInputContainer>
          <TextInput
            id="first-name"
            placeholder={t('qPlaceholder')}
            value={value}
            onChange={handleChange}
          />
        </TextInputContainer>
      </motion.div>
    </FormContainer>
  );
};

export default FirstNameField;
