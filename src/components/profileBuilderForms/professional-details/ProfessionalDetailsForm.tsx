'use client';

import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  AddWorkExperienceButton,
  AddWorkExperienceContainer,
  Container,
  Input,
  InputContainer,
  InputLabel,
  InputRow,
  ProfessionalDetailsContainer,
  TextArea,
  WorkExperienceContainer
} from './ProfessionalDetailsForm.styles';
import { ProfessionalExperienceType, ResumeInfoType } from '@/types/profile';
import { v4 as uuidv4 } from 'uuid';

interface ProfessionalDetailsFormProps {
  resumeInfo: { professional: { work: ProfessionalExperienceType[] } };
  setResumeInfo: Dispatch<SetStateAction<ResumeInfoType>>;
}

const ProfessionalDetailsForm: FC<ProfessionalDetailsFormProps> = ({
  resumeInfo,
  setResumeInfo
}) => {
  const [summary, setSummary] = useState('');

  const handleSummaryChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newSummary = event.target.value;
    setSummary(newSummary);

    setResumeInfo(prevInfo => ({
      ...prevInfo,
      professional: {
        ...prevInfo.professional,
        summary: newSummary
      }
    }));
    // console.log('newSummary', newSummary);
  };
  const handleAddWorkExperience = () => {
    const newId = uuidv4();

    setResumeInfo(prevInfo => ({
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
            jobDetails: ''
          }
        ]
      }
    }));
  };

  const handleInputChange = (
    id: string,
    field: keyof ProfessionalExperienceType,
    value: string
  ) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      professional: {
        ...prevInfo.professional,
        work: prevInfo.professional.work.map(experience =>
          experience.id === id ? { ...experience, [field]: value } : experience
        )
      }
    }));
  };

  return (
    <Container>
      <ProfessionalDetailsContainer>
        <InputContainer>
          <InputLabel>Summary:</InputLabel>
          <TextArea
            placeholder="Introduce yourself by pitching your skills & explaining how they can be of value to a company"
            value={summary}
            onChange={handleSummaryChange}
          />
        </InputContainer>
        <InputRow>
          <InputContainer></InputContainer>
          <InputContainer></InputContainer>
        </InputRow>
        <InputLabel>Work Experience:</InputLabel>
        {resumeInfo.professional.work.map(experience => (
          <WorkExperienceContainer key={experience.id}>
            <InputRow>
              <InputContainer>
                <InputLabel>Job title:</InputLabel>
                <Input
                  type="text"
                  placeholder="ex. Software developer"
                  value={experience.jobTitle}
                  onChange={e =>
                    handleInputChange(experience.id, 'jobTitle', e.target.value)
                  }
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>Company:</InputLabel>
                <Input
                  type="text"
                  placeholder="Company name"
                  value={experience.company}
                  onChange={e =>
                    handleInputChange(experience.id, 'company', e.target.value)
                  }
                />
              </InputContainer>
            </InputRow>
            <InputRow>
              <InputContainer>
                <InputLabel>Start date:</InputLabel>
                <Input
                  type="text"
                  placeholder="Enter start date Jan 2022"
                  value={experience.startDate}
                  onChange={e =>
                    handleInputChange(
                      experience.id,
                      'startDate',
                      e.target.value
                    )
                  }
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>End date:</InputLabel>
                <Input
                  type="text"
                  placeholder="Enter end date Jan 2023"
                  value={experience.endDate}
                  onChange={e =>
                    handleInputChange(experience.id, 'endDate', e.target.value)
                  }
                />
              </InputContainer>
            </InputRow>
            <InputLabel>Job details:</InputLabel>
            <TextArea
              placeholder="Describe your role and achievements"
              value={experience.jobDetails}
              onChange={e =>
                handleInputChange(experience.id, 'jobDetails', e.target.value)
              }
            />
          </WorkExperienceContainer>
        ))}

        <AddWorkExperienceContainer>
          <AddWorkExperienceButton onClick={handleAddWorkExperience}>
            Add work experience +
          </AddWorkExperienceButton>
        </AddWorkExperienceContainer>
      </ProfessionalDetailsContainer>
    </Container>
  );
};

export default ProfessionalDetailsForm;
