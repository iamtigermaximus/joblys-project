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
import { v4 as uuidv4 } from 'uuid';

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
      id: '',
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      jobDetails: '',
    },
  ]);

  const handleAddWorkExperience = () => {
    const newId = uuidv4();

    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      professional: {
        ...prevInfo.professional,
        work: [
          ...prevInfo.professional.work,
          {
            id: newId,
            jobTitle: '',
            company: '',
            startDate: '',
            endDate: '',
            jobDetails: '',
          },
        ],
      },
    }));
  };

  const [skills, setSkills] = useState<{ id: string; name: string }[]>([]);
  const [languages, setLanguages] = useState<{ id: string; name: string }[]>(
    []
  );

  const [currentSkill, setCurrentSkill] = useState<string>('');

  const handleAddSkillClick = () => {
    const newSkillId = uuidv4();
    const newSkill = { id: newSkillId, name: currentSkill };
    if (currentSkill.trim() !== '') {
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      setCurrentSkill(''); // Clear the input field after adding the skill
    }
  };

  const [currentLanguage, setCurrentLanguage] = useState<string>('');

  const handleAddLanguageClick = () => {
    const newLanguageId = uuidv4();
    const newLanguage = { id: newLanguageId, name: currentSkill };
    if (currentLanguage.trim() !== '') {
      setLanguages((prevLanguages) => [...prevLanguages, newLanguage]);
      setCurrentLanguage(''); // Clear the input field after adding the language
    }
  };

  const handleFieldChange = (
    id: string,
    field: 'skills' | 'languages',
    value: string
  ) => {
    if (field === 'skills') {
      setSkills((prevSkills) => {
        const updatedSkills = prevSkills.map((skill) =>
          skill.id === id ? { ...skill, name: value } : skill
        );
        return updatedSkills;
      });
    } else if (field === 'languages') {
      setLanguages((prevLanguages) => {
        const updatedLanguages = prevLanguages.map((language) =>
          language.id === id ? { ...language, name: value } : language
        );
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
              {skills.map((skill) => (
                <span key={skill.id}>{skill.name}</span>
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
              {languages.map((language) => (
                <span key={language.id}>{language.name}</span>
              ))}
            </SkillsBox>
          </InputContainer>
        </InputRow>
        <InputRow>
          <InputContainer></InputContainer>
          <InputContainer></InputContainer>
        </InputRow>
        <InputLabel>Work Experience:</InputLabel>
        {resumeInfo.professional.work.map((experience) => (
          <WorkExperienceContainer key={experience.id}>
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
        ))}
        <AddWorkExperienceContainer>
          <AddWorkExperienceButton onClick={handleAddWorkExperience}>
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
