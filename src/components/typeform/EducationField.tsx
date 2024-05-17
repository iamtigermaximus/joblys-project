import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Education } from '../profile/profile-builder/ProfileBuilder';
import { v4 as uuidv4 } from 'uuid';

const EducationFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  min-height: 200px;
`;

const EducationItem = styled.div`
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
  margin-bottom: 20px;
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

const AddEducationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const AddEducation = styled.button`
  padding: 10px;
`;

const EducationItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface EducationFieldProps {
  value: Education[];
  onChange: (value: Education[]) => void;
}

const EducationField: React.FC<EducationFieldProps> = ({ value, onChange }) => {
  const handleAddEducation = () => {
    onChange([
      ...value,
      {
        id: uuidv4(),
        school: '',
        course: '',
        startDate: '',
        endDate: '',
      },
    ]);
  };

  const handleEducationChange = (
    id: string,
    field: string,
    newValue: string,
  ) => {
    const updatedEducations = value.map(edu => {
      if (edu.id === id) {
        return {
          ...edu,
          [field]: newValue,
        };
      }
      return edu;
    });
    onChange(updatedEducations);
  };
  return (
    <EducationFieldContainer>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ y: '50vh' }}
        animate={{ y: 0 }}
        transition={{ stiffness: 150 }}
        style={{ width: '100%' }}
      >
        <QuestionContainer>
          <h4>6.Provide your educational details:</h4>
        </QuestionContainer>
        {value.map(education => (
          <EducationItemsContainer key={education.id}>
            <TextInputContainer>
              <TextInput
                type="text"
                placeholder="Course"
                value={education.course}
                onChange={e =>
                  handleEducationChange(education.id, 'course', e.target.value)
                }
              />
            </TextInputContainer>
            <TextInputContainer>
              <TextInput
                type="text"
                placeholder="School"
                value={education.school}
                onChange={e =>
                  handleEducationChange(education.id, 'school', e.target.value)
                }
              />
            </TextInputContainer>
            <DateContainer>
              <TextInputContainer>
                <TextInput
                  type="date"
                  placeholder="Start Date"
                  value={education.startDate}
                  onChange={e =>
                    handleEducationChange(
                      education.id,
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
                  value={education.endDate}
                  onChange={e =>
                    handleEducationChange(
                      education.id,
                      'endDate',
                      e.target.value,
                    )
                  }
                />
              </TextInputContainer>
            </DateContainer>
          </EducationItemsContainer>
        ))}
        <AddEducationContainer>
          <AddEducation onClick={handleAddEducation}>
            Add Education
          </AddEducation>
        </AddEducationContainer>
      </motion.div>
    </EducationFieldContainer>
  );
};

export default EducationField;
