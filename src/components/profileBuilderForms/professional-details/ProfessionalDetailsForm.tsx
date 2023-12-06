'use client';

import React, { FC } from 'react';
import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';

interface ProfessionalDetailsFormProps {}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px 30px;
  /* overflow-y: scroll; */

  @media (min-width: ${bp.lg}) {
    padding: 50px 100px;
    height: 100%;
  }
`;

export const ProfessionalDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  padding: 30px 20px;
  margin-bottom: 20px;
  flex-direction: column;
  color: ${colors.white};

  @media (min-width: ${bp.sm}) {
    max-width: 400px;
    padding: 30px 40px;
  }

  @media (min-width: ${bp.md}) {
    max-width: 500px;
  }
`;

export const ProfessionalDetailsTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProfessionalDetailsTitle = styled.h1`
  color: ${colors.darkPurple};
  padding: 5px;
  letter-spacing: 1px;
  font-size: 16px;

  @media (min-width: ${bp.md}) {
    font-size: 25px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const TextArea = styled.textarea`
  border: 2px solid ${colors.blueGray};
  border-radius: 5px;
  padding: 10px;
  /* margin: 5px 0; */
  font-size: 12px;
  height: 80px;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    padding: 20px;
    height: 100px;
  }
`;

export const InputLabel = styled.label`
  font-size: 10px;
  color: ${colors.darkPurple};
  letter-spacing: 1px;
  margin: 5px 0;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    margin: 5px;
  }
`;

export const SaveDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  width: 100%;
`;

export const SaveDetailsButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.ashGray};
  border-radius: 5px;
  background-color: ${colors.purple};
  color: ${colors.white};
  /* margin: 5px; */
  font-size: 10px;
  width: 100%;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 10px;

  &:hover {
    background: ${colors.darkPurple};
  }

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    padding: 20px;
  }
`;
export const BackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.ashGray};
  border-radius: 5px;
  background-color: ${colors.purple};
  color: ${colors.white};
  /* margin: 5px; */
  font-size: 10px;
  width: 100%;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 10px;

  &:hover {
    background: ${colors.darkPurple};
  }

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    padding: 20px;
  }
`;
export const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Input = styled.input`
  border: 2px solid ${colors.blueGray};
  border-radius: 5px;
  padding: 10px;
  /* margin: 5px 0; */
  font-size: 12px;
  width: 100%;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    padding: 20px;
    /* margin: 5px; */
  }
`;

export const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.ashGray};
  border-radius: 5px;
  background-color: ${colors.purple};
  color: ${colors.white};
  /* margin: 5px; */
  font-size: 10px;
  width: 20%;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 10px;

  &:hover {
    background: ${colors.darkPurple};
  }

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    padding: 20px;
  }
`;

export const SkillsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  margin: 10px 0;
  border: 1px solid ${colors.darkPurple};

  @media (min-width: ${bp.md}) {
    height: 100px;
  }
`;

export const WorkExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AddWorkExperienceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  width: 100%;
`;

export const AddWorkExperienceButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.ashGray};
  border-radius: 5px;
  background-color: ${colors.purple};
  color: ${colors.white};
  /* margin: 5px; */
  font-size: 10px;
  width: 100%;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 10px;

  &:hover {
    background: ${colors.darkPurple};
  }

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    padding: 20px;
  }
`;
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
