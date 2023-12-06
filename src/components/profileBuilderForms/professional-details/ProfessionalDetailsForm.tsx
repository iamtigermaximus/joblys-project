'use client';

import React, { FC } from 'react';
import {
  AddButton,
  AddWorkExperienceButton,
  AddWorkExperienceContainer,
  BackButton,
  Container,
  Input,
  InputContainer,
  InputLabel,
  ProfessionalDetailsContainer,
  ProfessionalDetailsTitle,
  ProfessionalDetailsTitleContainer,
  SaveDetailsButton,
  SaveDetailsContainer,
  SkillsBox,
  SkillsContainer,
  TextArea,
  WorkExperienceContainer,
} from './ProfessionalDetailsForm.styles';

interface ProfessionalDetailsFormProps {}

const ProfessionalDetailsForm: FC<ProfessionalDetailsFormProps> = () => {
  return (
    <Container>
      <ProfessionalDetailsContainer>
        <ProfessionalDetailsTitleContainer>
          <ProfessionalDetailsTitle>
            Professional Experience
          </ProfessionalDetailsTitle>
        </ProfessionalDetailsTitleContainer>
        <InputLabel>Summary:</InputLabel>
        <TextArea placeholder="Introduce yourself by pitching your skills & explaining how they can be of value to a company" />
        <InputLabel>Skills:</InputLabel>
        <SkillsContainer>
          <InputContainer>
            <Input
              type="text"
              placeholder="ex. Technical skills, Communication skills"
            />
            <AddButton>Add</AddButton>
          </InputContainer>
          <SkillsBox>SKILLS</SkillsBox>
        </SkillsContainer>
        <InputLabel>Languages:</InputLabel>
        <SkillsContainer>
          <InputContainer>
            <Input type="text" placeholder="ex. English, Finnish" />
            <AddButton>Add</AddButton>
          </InputContainer>
          <SkillsBox>SKILLS</SkillsBox>
        </SkillsContainer>
        <InputLabel>Work Experience:</InputLabel>
        <WorkExperienceContainer>
          <InputLabel>Job title:</InputLabel>
          <Input type="text" placeholder="ex. Software developer" />
          <InputLabel>Company:</InputLabel>
          <Input type="text" placeholder="Company name" />
          <InputLabel>Start date:</InputLabel>
          <Input type="text" placeholder="Enter start date Jan 2022" />
          <InputLabel>End date:</InputLabel>
          <Input type="text" placeholder="Enter end date Jan 2023" />
          <InputLabel>Job details:</InputLabel>
          <TextArea placeholder="Describe your role and achievements" />
        </WorkExperienceContainer>
        <AddWorkExperienceContainer>
          <AddWorkExperienceButton>
            Add work experience +
          </AddWorkExperienceButton>
        </AddWorkExperienceContainer>
        <SaveDetailsContainer>
          <BackButton>Back</BackButton>
          <SaveDetailsButton>Save</SaveDetailsButton>
        </SaveDetailsContainer>
      </ProfessionalDetailsContainer>
    </Container>
  );
};

export default ProfessionalDetailsForm;
