import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { WorkExperience } from '../profile/profile-builder/ProfileBuilder';
import { v4 as uuidv4 } from 'uuid';

const WorkExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  min-height: 200px;
`;

const ExperienceItem = styled.div`
  margin-bottom: 10px;
  width: 100%;
  gap: 10px;
`;

const QuestionContainer = styled.div`
  width: 100%;
  padding: 20px 10px;
`;
const TextInputContainer = styled.div`
  width: 100%;
  padding: 5px;
`;

const DateContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const AdditionalTextInputContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 10px;
  /* margin-bottom: 5px; */
  border: none;
  background-color: #f5f5f5;
  outline: none;
  border-bottom: 0.5px solid gray;

  &:focus {
    border-bottom: 1px solid gray;
  }
`;

const AddWorkExperienceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const AddWorkExperience = styled.button`
  padding: 10px;
`;

export const TextArea = styled.textarea`
  border-radius: 5px;
  height: 100px;
  padding: 8px 12px;
  color: black;
  border: 0.5 solid gray;
  width: 100%;
  background-color: transparent;

  &:focus {
    outline: 0.5px solid gray;
  }
`;

interface WorkExperienceFieldProps {
  value: WorkExperience[];
  onChange: (value: WorkExperience[]) => void;
}

const WorkExperienceField: React.FC<WorkExperienceFieldProps> = ({
  value,
  onChange,
}) => {
  const handleAddExperience = () => {
    onChange([
      ...value,
      {
        id: uuidv4(),
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        jobDetail: '',
      },
    ]);
  };

  const handleExperienceChange = (
    id: string,
    field: string,
    newValue: string,
  ) => {
    const updatedExperience = value.map(exp => {
      if (exp.id === id) {
        return {
          ...exp,
          [field]: newValue,
        };
      }
      return exp;
    });
    onChange(updatedExperience);
  };
  return (
    <WorkExperienceContainer>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ y: '50vh' }}
        animate={{ y: 0 }}
        transition={{ stiffness: 150 }}
        style={{ width: '100%' }}
      >
        <QuestionContainer>
          <h4>7.Provide your professional details:</h4>
        </QuestionContainer>
        {value.map(experience => (
          <ExperienceItem key={experience.id}>
            <TextInputContainer>
              <TextInput
                type="text"
                placeholder="Job Title"
                value={experience.jobTitle}
                onChange={e =>
                  handleExperienceChange(
                    experience.id,
                    'jobTitle',
                    e.target.value,
                  )
                }
              />
            </TextInputContainer>

            <TextInputContainer>
              <TextInput
                type="text"
                placeholder="Company"
                value={experience.company}
                onChange={e =>
                  handleExperienceChange(
                    experience.id,
                    'company',
                    e.target.value,
                  )
                }
              />
            </TextInputContainer>

            <DateContainer>
              <TextInputContainer>
                <TextInput
                  type="date"
                  placeholder="Start Date"
                  value={experience.startDate}
                  onChange={e =>
                    handleExperienceChange(
                      experience.id,
                      'startDate',
                      e.target.value,
                    )
                  }
                />
              </TextInputContainer>
              <TextInputContainer>
                <TextInput
                  type="date"
                  placeholder="End Date"
                  value={experience.endDate}
                  onChange={e =>
                    handleExperienceChange(
                      experience.id,
                      'endDate',
                      e.target.value,
                    )
                  }
                />
              </TextInputContainer>
            </DateContainer>

            <TextInputContainer>
              <TextArea
                placeholder="Job Details"
                value={experience.jobDetail}
                onChange={e =>
                  handleExperienceChange(
                    experience.id,
                    'jobDetail',
                    e.target.value,
                  )
                }
              />
            </TextInputContainer>
          </ExperienceItem>
        ))}
        <AddWorkExperienceContainer>
          <AddWorkExperience onClick={handleAddExperience}>
            Add Experience
          </AddWorkExperience>
        </AddWorkExperienceContainer>
      </motion.div>
    </WorkExperienceContainer>
  );
};

export default WorkExperienceField;
