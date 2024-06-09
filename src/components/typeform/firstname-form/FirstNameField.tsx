import React, { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { capitalizeFirstLetter } from '../../helpers/formHelpers';
import {
  FormContainer,
  QuestionContainer,
  TextInput,
  TextInputContainer,
} from './FirstNameField.styles';

interface FirstNameFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const FirstNameField: React.FC<FirstNameFieldProps> = ({ value, onChange }) => {
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
          <h4>1.What is your first name?</h4>
        </QuestionContainer>
        <TextInputContainer>
          <TextInput
            id="first-name"
            placeholder="Type your answer here"
            value={value}
            onChange={handleChange}
          />
        </TextInputContainer>
      </motion.div>
    </FormContainer>
  );
};

export default FirstNameField;
