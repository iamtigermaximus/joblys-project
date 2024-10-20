import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { Education } from '@/types/profile';
import { capitalizeFirstLetter } from '../../helpers/formHelpers';
import {
  EducationFieldContainer,
  QuestionContainer,
  EducationItemsContainer,
  TextInputContainer,
  TextInput,
  DateContainer,
  InputLabel,
  DropdownContainer,
  MonthSelect,
  YearSelect,
  AddEducationContainer,
  AddEducation,
  Question,
  AddButtonContainer,
} from './EducationField.styles';
import { useTranslations } from 'next-intl';

// Month names
const monthNames = [
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

interface EducationFieldProps {
  value: Education[];
  onChange: (value: Education[]) => void;
}

const EducationField: React.FC<EducationFieldProps> = ({ value, onChange }) => {
  const t = useTranslations('ProfileBuilder');

  const [educations, setEducations] = useState<Education[]>(() => {
    return value.length > 0
      ? value
      : [
          {
            id: uuidv4(),
            school: '',
            course: '',
            startDate: {
              month: 'January',
              year: `${new Date().getFullYear()}`,
            },
            endDate: { month: 'January', year: `${new Date().getFullYear()}` },
            description: '',
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
      startDate: { month: 'January', year: `${new Date().getFullYear()}` },
      endDate: { month: 'January', year: `${new Date().getFullYear()}` },
      description: '',
    };
    const newEducations = [...educations, newEducation];
    setEducations(newEducations);
    onChange(newEducations);
  };

  const handleDeleteEducation = (id: string) => {
    const updatedEducation = educations.filter(educ => educ.id !== id);
    setEducations(updatedEducation);
    onChange(updatedEducation);
  };

  const generateMonths = () => monthNames;

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 50 }, (_, index) => currentYear - index);
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
          <Question>{t('qEducation')}</Question>
        </QuestionContainer>
        {educations.map(education => (
          <EducationItemsContainer key={education.id}>
            <TextInputContainer>
              <TextInput
                type="text"
                placeholder={t('coursePlaceholder')}
                value={education.course}
                onChange={e =>
                  handleEducationChange(
                    education.id,
                    'course',
                    capitalizeFirstLetter(e.target.value),
                  )
                }
              />
            </TextInputContainer>
            <TextInputContainer>
              <TextInput
                type="text"
                placeholder={t('schoolPlaceholder')}
                value={education.school}
                onChange={e =>
                  handleEducationChange(
                    education.id,
                    'school',
                    capitalizeFirstLetter(e.target.value),
                  )
                }
              />
            </TextInputContainer>
            <DateContainer>
              <TextInputContainer>
                <InputLabel>{t('startDate')}</InputLabel>
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
                        {month}
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
                <InputLabel>{t('endDate')}</InputLabel>
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
                        {month}
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
            <AddButtonContainer>
              <AddEducation onClick={() => handleDeleteEducation(education.id)}>
                {t('delete')}
              </AddEducation>
            </AddButtonContainer>
          </EducationItemsContainer>
        ))}
        <AddEducationContainer>
          <AddEducation onClick={handleAddEducation}>
            {t('addEducation')}
          </AddEducation>
        </AddEducationContainer>
      </motion.div>
    </EducationFieldContainer>
  );
};

export default EducationField;
