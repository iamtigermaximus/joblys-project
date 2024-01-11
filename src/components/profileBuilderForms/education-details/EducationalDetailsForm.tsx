'use client';

import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  AddEducationButton,
  AddEducationContainer,
  BackButton,
  Container,
  EducationContainer,
  EducationalDetailsContainer,
  EducationalDetailsTitle,
  EducationalDetailsTitleContainer,
  Input,
  InputContainer,
  InputLabel,
  InputRow,
  SaveDetailsButton,
  SaveDetailsContainer,
  TextArea
} from './EducationaDetailsForm.styles';
import { EducationType, ResumeInfoType } from '@/types/profile';
import { v4 as uuidv4 } from 'uuid';

interface EducationalDetailsFormProps {
  resumeInfo: { educational: { education: EducationType[] } };
  setResumeInfo: Dispatch<SetStateAction<ResumeInfoType>>;
}

const EducationalDetailsForm: FC<EducationalDetailsFormProps> = ({
  resumeInfo,
  setResumeInfo
}) => {
  const handleAddEducation = () => {
    const newId = uuidv4();
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      educational: {
        ...prevInfo.educational,
        education: [
          ...prevInfo.educational.education,
          {
            id: newId,
            school: '',
            course: '',
            startDate: '',
            endDate: '',
            description: ''
          }
        ]
      }
    }));
  };

  const handleInputChange = (
    id: string,
    field: keyof EducationType,
    value: string
  ) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      educational: {
        ...prevInfo.educational,
        education: prevInfo.educational.education.map(educ =>
          educ.id === id ? { ...educ, [field]: value } : educ
        )
      }
    }));
  };

  return (
    <Container>
      <EducationalDetailsContainer>
        {resumeInfo.educational.education.map(educ => (
          <EducationContainer key={educ.id}>
            <InputRow>
              <InputContainer>
                <InputLabel>School:</InputLabel>
                <Input
                  type="text"
                  placeholder="ex. College, University, school"
                  value={educ.school}
                  onChange={e =>
                    handleInputChange(educ.id, 'school', e.target.value)
                  }
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>Course/Degree:</InputLabel>
                <Input
                  type="text"
                  placeholder="ex. Bachelors, Masters"
                  value={educ.course}
                  onChange={e =>
                    handleInputChange(educ.id, 'course', e.target.value)
                  }
                />
              </InputContainer>
            </InputRow>
            <InputRow>
              <InputContainer>
                <InputLabel>Start date:</InputLabel>
                <Input
                  type="date"
                  placeholder="Enter start date or year Jan 2022"
                  value={educ.startDate}
                  onChange={e =>
                    handleInputChange(educ.id, 'startDate', e.target.value)
                  }
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>End date:</InputLabel>
                <Input
                  type="date"
                  placeholder="Enter end date or year Jan 2023"
                  value={educ.endDate}
                  onChange={e =>
                    handleInputChange(educ.id, 'endDate', e.target.value)
                  }
                />
              </InputContainer>
            </InputRow>
            <InputLabel>Description:</InputLabel>
            <TextArea
              placeholder="Describe your role and achievements"
              value={educ.description}
              onChange={e =>
                handleInputChange(educ.id, 'description', e.target.value)
              }
            />
          </EducationContainer>
        ))}
        <AddEducationContainer>
          <AddEducationButton onClick={handleAddEducation}>
            Add education +
          </AddEducationButton>
        </AddEducationContainer>
      </EducationalDetailsContainer>
    </Container>
  );
};

export default EducationalDetailsForm;
