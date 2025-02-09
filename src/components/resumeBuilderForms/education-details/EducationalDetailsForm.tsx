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
import { useTranslations } from 'next-intl';

interface EducationalDetailsFormProps {
  educational: EducationType[];
  setResumeInfo: Dispatch<SetStateAction<Resume>>;
}

const EducationalDetailsForm: FC<EducationalDetailsFormProps> = ({
  educational,
  setResumeInfo,
}) => {
  const t = useTranslations('ResumeBuilder');
  useEffect(() => {
    console.log('Educational data:', educational);
  }, [educational]);

  const generateMonths = () => {
    return [
      t('months.January'),
      t('months.February'),
      t('months.March'),
      t('months.April'),
      t('months.May'),
      t('months.June'),
      t('months.July'),
      t('months.August'),
      t('months.September'),
      t('months.October'),
      t('months.November'),
      t('months.December'),
    ];
  };

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
        {
          id: newId,
          school: '',
          course: '',
          startDate: { month: 'January', year: currentYear },
          endDate: { month: 'January', year: currentYear },
          description: '',
        },
        ...prevInfo.educational,
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
                <InputLabel>{t('school')}</InputLabel>
                <Input
                  type="text"
                  placeholder="ex. College, University, School"
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
                <InputLabel>{t('course')}</InputLabel>
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
                <InputLabel>{t('startDate')}</InputLabel>
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
                <InputLabel>{t('endDate')}</InputLabel>
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
                {t('remove')}
              </TrashIcon>
            </ButtonsContainer>
          </EducationContainer>
        ))}
        <AddEducationContainer>
          <AddEducationButton onClick={handleAddEducation}>
            {t('addNewEducation')}{' '}
          </AddEducationButton>
        </AddEducationContainer>
      </EducationalDetailsContainer>
    </Container>
  );
};

export default EducationalDetailsForm;
