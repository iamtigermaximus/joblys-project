import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { WorkExperience } from '@/types/profile';
import { breakpoints as bp } from '@/utils/layout';

const WorkExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 200px;

  @media (min-width: ${bp.md}) {
    width: 400px;
  }
`;

const ExperienceItem = styled.div`
  margin-bottom: 10px;
  width: 100%;
  gap: 10px;
`;

const QuestionContainer = styled.div`
  padding: 20px 10px;

  @media (min-width: ${bp.md}) {
    width: 100%;
  }
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

export const InputLabel = styled.label`
  font-size: 10px;
  font-size: 14px;
  padding: 10px;
  color: gray;
`;

export const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const MonthSelect = styled.select`
  width: 50%;
  background-color: #f5f5f5;
  height: 40px;
  padding: 8px;
  border: none;
  margin-right: 5px;
  font-size: 14px;
  color: gray;
`;

export const YearSelect = styled.select`
  width: 50%;
  background-color: #f5f5f5;
  height: 40px;
  padding: 8px;
  border: none;
  font-size: 14px;
  color: gray;
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
        startDate: { month: '01', year: `${new Date().getFullYear()}` },
        endDate: { month: '01', year: `${new Date().getFullYear()}` },
        jobDetails: '',
      },
    ]);
  };

  const generateMonths = () => {
    return Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
      return month < 10 ? `0${month}` : `${month}`;
    });
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, index) => currentYear - index);
  };

  const months = generateMonths();
  const years = generateYears();

  const handleExperienceChange = (
    id: string,
    field: string,
    newValue: string | { month: string; year: string },
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
                <InputLabel>Start date:</InputLabel>
                <DropdownContainer>
                  <MonthSelect
                    value={experience.startDate.month}
                    onChange={e =>
                      handleExperienceChange(experience.id, 'startDate', {
                        ...experience.startDate,
                        month: e.target.value,
                      })
                    }
                  >
                    {months.map(month => (
                      <option key={month} value={month}>
                        {new Date(2022, parseInt(month) - 1).toLocaleString(
                          'default',
                          {
                            month: 'long',
                          },
                        )}
                      </option>
                    ))}
                  </MonthSelect>
                  <YearSelect
                    value={experience.startDate.year}
                    onChange={e =>
                      handleExperienceChange(experience.id, 'startDate', {
                        ...experience.startDate,
                        year: e.target.value,
                      })
                    }
                  >
                    {years.map(year => (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    ))}
                  </YearSelect>
                </DropdownContainer>
              </TextInputContainer>
              <TextInputContainer>
                <InputLabel>End date:</InputLabel>
                <DropdownContainer>
                  <MonthSelect
                    value={experience.endDate.month}
                    onChange={e =>
                      handleExperienceChange(experience.id, 'endDate', {
                        ...experience.endDate,
                        month: e.target.value,
                      })
                    }
                  >
                    {months.map(month => (
                      <option key={month} value={month}>
                        {new Date(2022, parseInt(month) - 1).toLocaleString(
                          'default',
                          {
                            month: 'long',
                          },
                        )}
                      </option>
                    ))}
                  </MonthSelect>
                  <YearSelect
                    value={experience.endDate.year}
                    onChange={e =>
                      handleExperienceChange(experience.id, 'endDate', {
                        ...experience.endDate,
                        year: e.target.value,
                      })
                    }
                  >
                    {years.map(year => (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    ))}
                  </YearSelect>
                </DropdownContainer>
              </TextInputContainer>
            </DateContainer>

            <TextInputContainer>
              <TextArea
                placeholder="Job Details"
                value={experience.jobDetails}
                onChange={e =>
                  handleExperienceChange(
                    experience.id,
                    'jobDetails',
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
