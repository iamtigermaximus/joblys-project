'use client';

import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  AddEducationButton,
  AddEducationContainer,
  BackButton,
  Container,
  EducationalDetailsContainer,
  EducationalDetailsTitle,
  EducationalDetailsTitleContainer,
  Input,
  InputContainer,
  InputLabel,
  InputRow,
  SaveDetailsButton,
  SaveDetailsContainer,
} from './EducationaDetailsForm.styles';
import { EducationType, ResumeInfoType } from '@/types/profile';
import { v4 as uuidv4 } from 'uuid';

interface EducationalDetailsFormProps {
  resumeInfo: { educational: { education: EducationType[] } };
  setResumeInfo: Dispatch<SetStateAction<ResumeInfoType>>;
  setPage: Dispatch<SetStateAction<number>>;
}

const EducationalDetailsForm: FC<EducationalDetailsFormProps> = ({
  resumeInfo,
  setResumeInfo,
  setPage,
}) => {
  const addEducation = () => {
    const newId = uuidv4();
    setResumeInfo((prevInfo) => ({
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
          },
        ],
      },
    }));
  };

  return (
    <Container>
      <EducationalDetailsContainer>
        <EducationalDetailsTitleContainer>
          <EducationalDetailsTitle>Educational Details</EducationalDetailsTitle>
        </EducationalDetailsTitleContainer>
        {resumeInfo.educational.education.map((educ) => (
          <div key={educ.id}>
            <InputRow>
              <InputContainer>
                <InputLabel>School:</InputLabel>
                <Input
                  type="text"
                  placeholder="ex. College, University, school"
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>Course/Degree:</InputLabel>
                <Input type="text" placeholder="ex. Bachelors, Masters" />
              </InputContainer>
            </InputRow>
            <InputRow>
              <InputContainer>
                <InputLabel>Start date:</InputLabel>
                <Input
                  type="text"
                  placeholder="Enter start date or year Jan 2022"
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>End date:</InputLabel>
                <Input
                  type="text"
                  placeholder="Enter end date or year Jan 2023"
                />
              </InputContainer>
            </InputRow>
          </div>
        ))}
        <AddEducationContainer>
          <AddEducationButton onClick={addEducation}>
            Add education +
          </AddEducationButton>
        </AddEducationContainer>
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
            Save & Submit
          </SaveDetailsButton>
        </SaveDetailsContainer>
      </EducationalDetailsContainer>
    </Container>
  );
};

export default EducationalDetailsForm;
