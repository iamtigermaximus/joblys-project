import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const WorkExperienceField = () => {
  const [workExperiences, setWorkExperiences] = useState([
    {
      id: 1,
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      jobDetails: '',
    },
  ]);

  const handleAddExperience = () => {
    const newId = workExperiences.length + 1;
    setWorkExperiences([
      ...workExperiences,
      {
        id: newId,
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        jobDetails: '',
      },
    ]);
  };

  const handleChange = (id: number, field: string, value: string) => {
    setWorkExperiences(
      workExperiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    );
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
        {workExperiences.map(experience => (
          <ExperienceItem key={experience.id}>
            <TextInputContainer>
              <TextInput
                type="text"
                placeholder="Job Title"
                value={experience.jobTitle}
                onChange={e =>
                  handleChange(experience.id, 'jobTitle', e.target.value)
                }
              />
            </TextInputContainer>

            <TextInputContainer>
              <TextInput
                type="text"
                placeholder="Company"
                value={experience.company}
                onChange={e =>
                  handleChange(experience.id, 'company', e.target.value)
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
                    handleChange(experience.id, 'startDate', e.target.value)
                  }
                />
              </TextInputContainer>
              <TextInputContainer>
                <TextInput
                  type="date"
                  placeholder="End Date"
                  value={experience.endDate}
                  onChange={e =>
                    handleChange(experience.id, 'endDate', e.target.value)
                  }
                />
              </TextInputContainer>
            </DateContainer>

            <TextInputContainer>
              <TextArea
                placeholder="Job Details"
                value={experience.jobDetails}
                onChange={e =>
                  handleChange(experience.id, 'jobDetails', e.target.value)
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
