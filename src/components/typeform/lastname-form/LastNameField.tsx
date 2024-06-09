import React, { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { capitalizeFirstLetter } from '../../helpers/formHelpers';
import {
  FormContainer,
  QuestionContainer,
  TextInput,
} from './LastNameField.styles';

interface LastNameFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const LastNameField: React.FC<LastNameFieldProps> = ({ value, onChange }) => {
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
          <h4>2.What is your last name?</h4>
        </QuestionContainer>
        <TextInput
          id="last-name"
          placeholder="Type your answer here"
          value={value}
          onChange={handleChange}
        />
      </motion.div>
    </FormContainer>
  );
};

export default LastNameField;
