'use client';

import React, { FC } from 'react';
import {
  BasicDetailsContainer,
  BasicDetailsTitle,
  BasicDetailsTitleContainer,
  Container,
  Input,
  InputLabel,
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
        <InputLabel>First Name:</InputLabel>
        <Input type="text" placeholder="Your first name" />
        <InputLabel>Last Name:</InputLabel>
        <Input type="text" placeholder="Your last name" />
        <InputLabel>Phone number:</InputLabel>
        <Input type="tel" placeholder="phone number" />
        <InputLabel>Email address:</InputLabel>
        <Input type="email" placeholder="Your email" />
        <InputLabel>LinkedIn:</InputLabel>
        <Input type="url" placeholder="https://example.com" />
        <InputLabel>Github:</InputLabel>
        <Input type="url" placeholder="https://example.com" />
        <InputLabel>Portfolio or Website:</InputLabel>
        <Input type="url" placeholder="https://example.com" />
        <InputLabel>Address:</InputLabel>
        <Input type="text" placeholder="address" />
        <SaveDetailsContainer>
          <SaveDetailsButton>Save</SaveDetailsButton>
        </SaveDetailsContainer>
      </BasicDetailsContainer>
    </Container>
  );
};

export default BasicDetailsForm;
