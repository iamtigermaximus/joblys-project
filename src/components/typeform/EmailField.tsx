import React, { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { breakpoints as bp } from '@/utils/layout';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  /* background-color: pink; */

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
