'use client';

import React, { FC } from 'react';
import {
  AddEducationButton,
  AddEducationContainer,
  BackButton,
  Container,
  EducationalDetailsContainer,
  EducationalDetailsTitle,
  EducationalDetailsTitleContainer,
  Input,
  InputLabel,
  SaveDetailsButton,
  SaveDetailsContainer,
} from './EducationaDetailsForm.styles';

interface EducationalDetailsFormProps {}

const EducationalDetailsForm: FC<EducationalDetailsFormProps> = () => {
  return (
    <Container>
      <EducationalDetailsContainer>
        <EducationalDetailsTitleContainer>
          <EducationalDetailsTitle>Educational Details</EducationalDetailsTitle>
        </EducationalDetailsTitleContainer>
        <InputLabel>School:</InputLabel>
        <Input type="text" placeholder="ex. College, University, school" />
        <InputLabel>Course/Degree:</InputLabel>
        <Input type="text" placeholder="ex. Bachelors, Masters" />
        <InputLabel>Start date:</InputLabel>
        <Input type="text" placeholder="Enter start date or year Jan 2022" />
        <InputLabel>End date:</InputLabel>
        <Input type="text" placeholder="Enter end date or year Jan 2023" />
        <AddEducationContainer>
          <AddEducationButton>Add work experience +</AddEducationButton>
        </AddEducationContainer>
        <SaveDetailsContainer>
          <BackButton>Back</BackButton>
          <SaveDetailsButton>Save & Submit</SaveDetailsButton>
        </SaveDetailsContainer>
      </EducationalDetailsContainer>
    </Container>
  );
};

export default EducationalDetailsForm;
