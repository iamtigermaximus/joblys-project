import React, { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import {
  FormContainer,
  QuestionContainer,
  TextInput,
  TextInputContainer,
} from './EmailField.styles';

interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const EmailField: React.FC<EmailFieldProps> = ({ value, onChange }) => {
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
          <h4>3.What is your email?</h4>
        </QuestionContainer>
        <TextInputContainer>
          <TextInput
            id="email-id"
            placeholder="Type your answer here"
            value={value}
            onChange={handleChange}
          />
        </TextInputContainer>
      </motion.div>
    </FormContainer>
  );
};

export default EmailField;
