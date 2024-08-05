'use client';
import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
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
  YearSelect,
  ButtonsContainer,
  TrashIcon,
} from './EducationaDetailsForm.styles';
import { EducationType, Resume } from '@/types/resume';
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
  useEffect(() => {
    console.log('Educational data:', educational);
  }, [educational]);

  const generateMonths = () => [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 50 }, (_, index) =>
      (currentYear - index).toString(),
    );
  };

  const months = generateMonths();
  const years = generateYears();

  const handleAddEducation = () => {
    const newId = uuidv4();
    const currentYear = new Date().getFullYear().toString();
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      educational: [
        ...prevInfo.educational,
        {
          id: newId,
          school: '',
          course: '',
          startDate: { month: 'January', year: currentYear },
          endDate: { month: 'January', year: currentYear },
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
        educ.id === id
          ? {
              ...educ,
              [field]:
                typeof value === 'string'
                  ? value
                  : { ...(educ[field] as any), ...value },
            }
          : educ,
      ),
    }));
  };

  const handleDeleteEducation = (id: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      educational: prevInfo.educational.filter(educ => educ.id !== id),
    }));
  };

  return (
    <Container>
      <EducationalDetailsContainer>
        {educational.map(educ => (
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
                    onChange={e => {
                      handleInputChange(educ.id, 'startDate', {
                        ...educ.startDate,
                        month: e.target.value,
                      });
                    }}
                  >
                    {months.map(month => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </MonthSelect>
                  <YearSelect
                    value={educ.startDate.year}
                    onChange={e => {
                      handleInputChange(educ.id, 'startDate', {
                        ...educ.startDate,
                        year: e.target.value,
                      });
                    }}
                  >
                    {years.map(year => (
                      <option key={year} value={year}>
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
                    onChange={e => {
                      handleInputChange(educ.id, 'endDate', {
                        ...educ.endDate,
                        month: e.target.value,
                      });
                      console.log(
                        `Updated end month for ${educ.id}:`,
                        e.target.value,
                      );
                    }}
                  >
                    {months.map(month => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </MonthSelect>
                  <YearSelect
                    value={educ.endDate.year}
                    onChange={e => {
                      handleInputChange(educ.id, 'endDate', {
                        ...educ.endDate,
                        year: e.target.value,
                      });
                      console.log(
                        `Updated end year for ${educ.id}:`,
                        e.target.value,
                      );
                    }}
                  >
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </YearSelect>
                </DropdownContainer>
              </InputContainer>
            </InputRow>
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
