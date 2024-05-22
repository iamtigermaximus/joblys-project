import { Profile } from '@/types/profile';
import { useRouter } from 'next/navigation';
import React, { useState, ReactNode } from 'react';
import styled from 'styled-components';

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
  formData: Profile;
  setFormData: (data: Profile) => void;
  onSubmit: () => void;
}

const TypeForm: React.FC<TypeFormProps> = ({
  children,
  formData,
  setFormData,
  onSubmit,
}) => {
  const [fields, setFields] = useState(0);
  const router = useRouter();

  const nextField = () => {
    if (fields < children.length - 1) setFields(prev => prev + 1);
  };

  const prevField = () => {
    if (fields > 0) setFields(prev => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      await onSubmit();
      router.push('/joblys/profile');
    } catch (error: any) {
      console.error('Error:', error);
    }
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
