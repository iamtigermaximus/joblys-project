import React, { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import {
  FormContainer,
  Question,
  QuestionContainer,
  TextInput,
  TextInputContainer,
} from './EmailField.styles';
import { useTranslations } from 'next-intl';

interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const EmailField: React.FC<EmailFieldProps> = ({ value, onChange }) => {
  const t = useTranslations('ProfileBuilder');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
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
          <Question>{t('qEmail')}</Question>
        </QuestionContainer>
        <TextInputContainer>
          <TextInput
            id="email-id"
            placeholder={t('qPlaceholder')}
            value={value}
            onChange={handleChange}
          />
        </TextInputContainer>
      </motion.div>
    </FormContainer>
  );
};

export default EmailField;
