import React, { useState, ReactNode } from 'react';
import styled from 'styled-components';

// Styled components for the form container and button group
const FormContainer = styled.div`
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* border: 1px solid white; */
  /* height: 100%; */
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
`;

const FieldContainer = styled.div`
  /* height: 400px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  /* border: 1px solid red; */
`;

const ButtonGroup = styled.div`
  display: flex;
  padding: 10px;
`;

const Button = styled.button`
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 8px;
  cursor: pointer;
  background-color: #520668;

  &:hover {
    background-color: #3e0450;
  }
`;

interface TypeFormProps {
  children: ReactNode[];
  onSubmit: (formData: Record<string, string>) => void;
}

const TypeForm: React.FC<TypeFormProps> = ({ children, onSubmit }) => {
  const [fields, setFields] = useState(0);

  const [formData, setFormData] = useState<Record<string, string>>({});

  const nextField = () => {
    if (fields < children.length - 1) setFields(prev => prev + 1);
  };

  const prevField = () => {
    if (fields > 0) setFields(prev => prev - 1);
  };

  const handleChange = (fieldName: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [fieldName]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <FieldContainer> {children[fields]}</FieldContainer>
      </FormContainer>
      <ButtonGroup>
        {fields > 0 && <Button onClick={prevField}>Back</Button>}
        {fields < children.length - 1 && (
          <Button onClick={nextField}>Next</Button>
        )}
        {fields === children.length - 1 && (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </ButtonGroup>
    </>
  );
};

export default TypeForm;
