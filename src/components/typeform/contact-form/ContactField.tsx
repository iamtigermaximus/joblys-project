import React, { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import {
  QuestionContainer,
  TextInputContainer,
  TextInput,
  FormContainer,
  Question,
} from './ContactField.styles';

interface ContactFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const ContactField: React.FC<ContactFieldProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <FormContainer>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ y: '50vh' }}
        animate={{ y: 0 }}
        transition={{ stiffness: 150 }}
        style={{ width: '100%' }}
      >
        <QuestionContainer>
          <Question>4.What is your phone number?</Question>
        </QuestionContainer>
        <TextInputContainer>
          <TextInput
            id="contact"
            required
            placeholder="Type your answer here"
            value={value}
            onChange={handleChange}
          />
        </TextInputContainer>
      </motion.div>
    </FormContainer>
  );
};

export default ContactField;
