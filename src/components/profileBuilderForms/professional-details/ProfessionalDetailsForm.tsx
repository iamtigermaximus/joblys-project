'use client';

import React, { Dispatch, FC, SetStateAction, useState } from 'react';
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
import { ProfessionalExperienceType, ResumeInfoType } from '@/types/profile';

interface ProfessionalDetailsFormProps {
  resumeInfo: { professional: { work: ProfessionalExperienceType[] } };
  setResumeInfo: Dispatch<SetStateAction<ResumeInfoType>>;
  setPage: Dispatch<SetStateAction<number>>;
}

const ProfessionalDetailsForm: FC<ProfessionalDetailsFormProps> = ({
  resumeInfo,
  setResumeInfo,
  setPage,
}) => {
  const [workExperience, setWorkExperience] = useState<
    ProfessionalExperienceType[]
  >([
    {
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      jobDetails: '',
    },
  ]);

  const [skills, setSkills] = useState<string[]>(['']);
  const [languages, setLanguages] = useState<string[]>(['']);

  const [currentSkill, setCurrentSkill] = useState<string>('');

  const handleAddSkillClick = () => {
    if (currentSkill.trim() !== '') {
      setSkills((prevSkills) => [...prevSkills, currentSkill]);
      setCurrentSkill(''); // Clear the input field after adding the skill
    }
  };

  const [currentLanguage, setCurrentLanguage] = useState<string>('');

  const handleAddLanguageClick = () => {
    if (currentLanguage.trim() !== '') {
      setLanguages((prevLanguages) => [...prevLanguages, currentLanguage]);
      setCurrentLanguage(''); // Clear the input field after adding the language
    }
  };

  const handleFieldChange = (
    index: number,
    field: 'skills' | 'languages',
    value: string
  ) => {
    if (field === 'skills') {
      setSkills((prevSkills) => {
        const updatedSkills = [...prevSkills];
        updatedSkills[index] = value;
        return updatedSkills;
      });
    } else if (field === 'languages') {
      setLanguages((prevLanguages) => {
        const updatedLanguages = [...prevLanguages];
        updatedLanguages[index] = value;
        return updatedLanguages;
      });
    }
  };

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
            <InputLabel>Skills:</InputLabel>
            <Input
              type="text"
              placeholder="ex. Technical skills, Communication skills"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
            />
            <AddButton onClick={handleAddSkillClick}>Add</AddButton>
            <SkillsBox>
              {skills.map((skill, index) => (
                <span key={index}>{skill}</span>
              ))}
            </SkillsBox>
          </InputContainer>
          <InputContainer>
            <InputLabel>Languages:</InputLabel>
            <Input
              type="text"
              placeholder="ex. English, Finnish"
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
            />
            <AddButton onClick={handleAddLanguageClick}>Add</AddButton>
            <SkillsBox>
              {languages.map((language, index) => (
                <span key={index}>{language}</span>
              ))}
            </SkillsBox>
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
              <InputLabel>Job title:</InputLabel>
              <Input type="text" placeholder="ex. Software developer" />
            </InputContainer>
            <InputContainer>
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
          <BackButton
            onClick={() => {
              setPage((p) => p - 1);
            }}
          >
            Back
          </BackButton>
          <SaveDetailsButton
            onClick={() => {
              console.log(
                'Resume Info before moving to next form:',
                resumeInfo
              );

              setPage((p) => p + 1);
            }}
          >
            Save
          </SaveDetailsButton>
        </SaveDetailsContainer>
      </ProfessionalDetailsContainer>
    </Container>
  );
};

export default ProfessionalDetailsForm;
