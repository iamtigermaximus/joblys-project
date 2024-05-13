import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled component for the form container
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 200px;
  /* background-color: pink; */
`;

const QuestionContainer = styled.div`
  width: 100%;
  padding: 20px 10px;
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

const FirstNameField: React.FC = () => {
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
          <TextInput id="first-name" placeholder="Type your answer here" />
        </TextInputContainer>
      </motion.div>
    </FormContainer>
  );
};

export default FirstNameField;
