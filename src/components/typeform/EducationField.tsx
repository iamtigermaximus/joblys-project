import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Education {
  id: number;
  course: string;
  school: string;
  startDate: string;
  endDate: string;
}

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

const EducationField: React.FC = () => {
  const [educations, setEducations] = useState<Education[]>([
    {
      id: 1,
      course: '',
      school: '',
      startDate: '',
      endDate: '',
    },
  ]);

  const handleAddEducation = () => {
    const newId = educations.length + 1;
    setEducations([
      ...educations,
      {
        id: newId,
        course: '',
        school: '',
        startDate: '',
        endDate: '',
      },
    ]);
  };

  const handleChange = (id: number, field: keyof Education, value: string) => {
    setEducations(
      educations.map(edu => (edu.id === id ? { ...edu, [field]: value } : edu)),
    );
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
        {educations.map(education => (
          <EducationItem key={education.id}>
            <TextInputContainer>
              <TextInput
                type="text"
                placeholder="Course"
                value={education.course}
                onChange={e =>
                  handleChange(education.id, 'course', e.target.value)
                }
              />
            </TextInputContainer>
            <TextInputContainer>
              <TextInput
                type="text"
                placeholder="School"
                value={education.school}
                onChange={e =>
                  handleChange(education.id, 'school', e.target.value)
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
                    handleChange(education.id, 'startDate', e.target.value)
                  }
                />
              </TextInputContainer>
              <TextInputContainer>
                <TextInput
                  type="date"
                  placeholder="End Date"
                  value={education.endDate}
                  onChange={e =>
                    handleChange(education.id, 'endDate', e.target.value)
                  }
                />
              </TextInputContainer>
            </DateContainer>
          </EducationItem>
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
