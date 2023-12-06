'use client';

import React, { FC } from 'react';
import {
  BasicDetailsContainer,
  BasicDetailsTitle,
  BasicDetailsTitleContainer,
  Container,
  Input,
  InputContainer,
  InputLabel,
  InputRow,
  SaveDetailsButton,
  SaveDetailsContainer,
} from './BasicDetailsForm.styles';

interface BasicDetailsFormProps {}

const BasicDetailsForm: FC<BasicDetailsFormProps> = () => {
  return (
    <Container>
      <BasicDetailsContainer>
        <BasicDetailsTitleContainer>
          <BasicDetailsTitle>Profile Details</BasicDetailsTitle>
        </BasicDetailsTitleContainer>
        <InputRow>
          <InputContainer>
            <InputLabel>First Name:</InputLabel>
            <Input type="text" placeholder="Your first name" />
          </InputContainer>
          <InputContainer>
            <InputLabel>Last Name:</InputLabel>
            <Input type="text" placeholder="Your last name" />
          </InputContainer>
        </InputRow>
        <InputRow>
          <InputContainer>
            <InputLabel>Phone number:</InputLabel>
            <Input type="tel" placeholder="phone number" />
          </InputContainer>
          <InputContainer>
            <InputLabel>Email address:</InputLabel>
            <Input type="email" placeholder="Your email" />
          </InputContainer>
        </InputRow>
        <InputRow>
          <InputContainer>
            <InputLabel>LinkedIn:</InputLabel>
            <Input type="url" placeholder="https://example.com" />
          </InputContainer>
          <InputContainer>
            <InputLabel>Github:</InputLabel>
            <Input type="url" placeholder="https://example.com" />
          </InputContainer>
        </InputRow>
        <InputRow>
          <InputContainer>
            <InputLabel>Portfolio or Website:</InputLabel>
            <Input type="url" placeholder="https://example.com" />
          </InputContainer>
          <InputContainer>
            <InputLabel>Address:</InputLabel>
            <Input type="text" placeholder="address" />
          </InputContainer>
        </InputRow>

        <SaveDetailsContainer>
          <SaveDetailsButton>Save</SaveDetailsButton>
        </SaveDetailsContainer>
      </BasicDetailsContainer>
    </Container>
  );
};

export default BasicDetailsForm;
