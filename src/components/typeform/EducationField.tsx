import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { Education } from '@/types/profile';
import { breakpoints as bp } from '@/utils/layout';

const EducationFieldContainer = styled.div`
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

const EducationItem = styled.div`
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

interface EducationFieldProps {
  value: Education[];
  onChange: (value: Education[]) => void;
}

const EducationField: React.FC<EducationFieldProps> = ({ value, onChange }) => {
  const [educations, setEducations] = useState<Education[]>(() => {
    return value.length > 0
      ? value
      : [
          {
            id: uuidv4(),
            school: '',
            course: '',
            startDate: { month: '01', year: `${new Date().getFullYear()}` },
            endDate: { month: '01', year: `${new Date().getFullYear()}` },
          },
        ];
  });

  const handleEducationChange = (
    id: string,
    field: string,
    newValue: string | { month: string; year: string },
  ) => {
    const updatedEducations = educations.map(edu => {
      if (edu.id === id) {
        return {
          ...edu,
          [field]: newValue,
        };
      }
      return edu;
    });
    setEducations(updatedEducations);
    onChange(updatedEducations);
  };

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: uuidv4(),
      school: '',
      course: '',
      startDate: { month: '01', year: `${new Date().getFullYear()}` },
      endDate: { month: '01', year: `${new Date().getFullYear()}` },
    };
    const newEducations = [...educations, newEducation];
    setEducations(newEducations);
    onChange(newEducations);
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
                {/* <TextInput
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
                /> */}
                <InputLabel>Start date:</InputLabel>
                <DropdownContainer>
                  <MonthSelect
                    value={education.startDate.month}
                    onChange={e =>
                      handleEducationChange(education.id, 'startDate', {
                        ...education.startDate,
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
                    value={education.startDate.year}
                    onChange={e =>
                      handleEducationChange(education.id, 'startDate', {
                        ...education.startDate,
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
                    value={education.endDate.month}
                    onChange={e =>
                      handleEducationChange(education.id, 'endDate', {
                        ...education.endDate,
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
                    value={education.endDate.year}
                    onChange={e =>
                      handleEducationChange(education.id, 'endDate', {
                        ...education.endDate,
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
