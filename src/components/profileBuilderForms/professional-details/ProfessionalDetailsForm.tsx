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
  InputRow,
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
        <InputContainer>
          <InputLabel>Summary:</InputLabel>
          <TextArea placeholder="Introduce yourself by pitching your skills & explaining how they can be of value to a company" />
        </InputContainer>
        <InputRow>
          <InputContainer>
            {' '}
            <InputLabel>Skills:</InputLabel>
            <Input
              type="text"
              placeholder="ex. Technical skills, Communication skills"
            />
            <AddButton>Add</AddButton>
            <SkillsBox>SKILLS</SkillsBox>
          </InputContainer>
          <InputContainer>
            {' '}
            <InputLabel>Languages:</InputLabel>
            <Input type="text" placeholder="ex. English, Finnish" />
            <AddButton>Add</AddButton>
            <SkillsBox>SKILLS</SkillsBox>
          </InputContainer>
        </InputRow>
        <InputRow>
          <InputContainer></InputContainer>
          <InputContainer></InputContainer>
        </InputRow>

        {/* <SkillsContainer>
          <InputContainer>
            <Input
              type="text"
              placeholder="ex. Technical skills, Communication skills"
            />
            <AddButton>Add</AddButton>
          </InputContainer>
          <SkillsBox>SKILLS</SkillsBox>
        </SkillsContainer> */}
        {/* <SkillsContainer>
          <InputContainer>
            <Input type="text" placeholder="ex. English, Finnish" />
            <AddButton>Add</AddButton>
          </InputContainer>
          <SkillsBox>SKILLS</SkillsBox>
        </SkillsContainer> */}
        <InputLabel>Work Experience:</InputLabel>
        <WorkExperienceContainer>
          <InputRow>
            <InputContainer>
              {' '}
              <InputLabel>Job title:</InputLabel>
              <Input type="text" placeholder="ex. Software developer" />
            </InputContainer>
            <InputContainer>
              {' '}
              <InputLabel>Company:</InputLabel>
              <Input type="text" placeholder="Company name" />
            </InputContainer>
          </InputRow>
          <InputRow>
            <InputContainer>
              <InputLabel>Start date:</InputLabel>
              <Input type="text" placeholder="Enter start date Jan 2022" />
            </InputContainer>
            <InputContainer>
              <InputLabel>End date:</InputLabel>
              <Input type="text" placeholder="Enter end date Jan 2023" />
            </InputContainer>
          </InputRow>
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
