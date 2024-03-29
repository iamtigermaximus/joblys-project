'use client';

import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  AddEducationButton,
  AddEducationContainer,
  Container,
  DropdownContainer,
  EducationContainer,
  EducationalDetailsContainer,
  Input,
  InputContainer,
  InputLabel,
  InputRow,
  MonthSelect,
  TextArea,
  YearSelect,
  ButtonsContainer,
  TrashIcon,
} from './EducationaDetailsForm.styles';
import { EducationType, Resume } from '@/types/profile';
import { v4 as uuidv4 } from 'uuid';
import { capitalizeFirstLetter } from '@/components/helpers/formHelpers';

interface EducationalDetailsFormProps {
  educational: EducationType[];
  setResumeInfo: Dispatch<SetStateAction<Resume>>;
}

const EducationalDetailsForm: FC<EducationalDetailsFormProps> = ({
  educational,
  setResumeInfo,
}) => {
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

  const handleAddEducation = () => {
    const newId = uuidv4();
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      educational: [
        ...prevInfo.educational,
        {
          id: newId,
          school: '',
          course: '',
          startDate: { month: '01', year: `${new Date().getFullYear()}` },
          endDate: { month: '01', year: `${new Date().getFullYear()}` },
          description: '',
        },
      ],
    }));
  };

  const handleInputChange = (
    id: string,
    field: keyof EducationType,
    value: string | { month: string; year: string },
  ) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      educational: prevInfo.educational.map(educ =>
        educ.id === id ? { ...educ, [field]: value } : educ,
      ),
    }));
  };

  const handleDeleteEducation = (id: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      educational: {
        ...prevInfo.educational,
        education: prevInfo.educational.filter(educ => educ.id !== id),
      },
    }));
  };

  return (
    <Container>
      <EducationalDetailsContainer>
        {educational &&
          educational.length > 0 &&
          educational.map(educ => (
            <EducationContainer key={educ.id}>
              <InputRow>
                <InputContainer>
                  <InputLabel>School:</InputLabel>
                  <Input
                    type="text"
                    placeholder="ex. College, University, school"
                    value={educ.school}
                    onChange={e =>
                      handleInputChange(
                        educ.id,
                        'school',
                        capitalizeFirstLetter(e.target.value),
                      )
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
                      handleInputChange(
                        educ.id,
                        'course',
                        capitalizeFirstLetter(e.target.value),
                      )
                    }
                  />
                </InputContainer>
              </InputRow>
              <InputRow>
                <InputContainer>
                  <InputLabel>Start date:</InputLabel>
                  <DropdownContainer>
                    <MonthSelect
                      value={educ.startDate.month}
                      onChange={e =>
                        handleInputChange(educ.id, 'startDate', {
                          ...educ.startDate,
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
                      value={educ.startDate.year}
                      onChange={e =>
                        handleInputChange(educ.id, 'startDate', {
                          ...educ.startDate,
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
                </InputContainer>
                <InputContainer>
                  <InputLabel>End date:</InputLabel>
                  <DropdownContainer>
                    <MonthSelect
                      value={educ.endDate.month}
                      onChange={e =>
                        handleInputChange(educ.id, 'endDate', {
                          ...educ.endDate,
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
                      value={educ.endDate.year}
                      onChange={e =>
                        handleInputChange(educ.id, 'endDate', {
                          ...educ.endDate,
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
                </InputContainer>
              </InputRow>
              <InputLabel>Description:</InputLabel>
              <TextArea
                placeholder="Describe your role and achievements"
                value={educ.description}
                onChange={e =>
                  handleInputChange(
                    educ.id,
                    'description',
                    capitalizeFirstLetter(e.target.value),
                  )
                }
              />
              <ButtonsContainer>
                <TrashIcon onClick={() => handleDeleteEducation(educ.id)}>
                  Remove
                </TrashIcon>
              </ButtonsContainer>
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
