import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { WorkExperience } from '@/types/profile';
import { capitalizeFirstLetter } from '../../helpers/formHelpers';
import {
  AddButtonContainer,
  AddWorkExperience,
  AddWorkExperienceContainer,
  DateContainer,
  DropdownContainer,
  ExperienceItem,
  InputLabel,
  MonthSelect,
  Question,
  QuestionContainer,
  TextArea,
  TextInput,
  TextInputContainer,
  WorkExperienceContainer,
  YearSelect,
} from './WorkExperienceField.styles';
import { useTranslations } from 'next-intl';

interface WorkExperienceFieldProps {
  value: WorkExperience[];
  onChange: (value: WorkExperience[]) => void;
}

const WorkExperienceField: React.FC<WorkExperienceFieldProps> = ({
  value,
  onChange,
}) => {
  const t = useTranslations('ProfileBuilder');
  const [experiences, setExperiences] = useState<WorkExperience[]>(() => {
    return value.length > 0
      ? value
      : [
          {
            id: uuidv4(),
            jobTitle: '',
            company: '',
            startDate: {
              month: 'January',
              year: `${new Date().getFullYear()}`,
            },
            endDate: { month: 'January', year: `${new Date().getFullYear()}` },
            jobDetails: '',
          },
        ];
  });

  const handleExperienceChange = (
    id: string,
    field: string,
    newValue: string | { month: string; year: string },
  ) => {
    const updatedExperiences = experiences.map(exp => {
      if (exp.id === id) {
        return {
          ...exp,
          [field]: newValue,
        };
      }
      return exp;
    });
    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
  };

  const handleAddExperience = () => {
    const newExperience: WorkExperience = {
      id: uuidv4(),
      jobTitle: '',
      company: '',
      startDate: { month: 'January', year: `${new Date().getFullYear()}` },
      endDate: { month: 'January', year: `${new Date().getFullYear()}` },
      jobDetails: '',
    };
    const newExperiences = [...experiences, newExperience];
    setExperiences(newExperiences);
    onChange(newExperiences);
  };

  const handleDeleteExperience = (id: string) => {
    const updatedExperiences = experiences.filter(exp => exp.id !== id);
    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
  };

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
    return Array.from({ length: 50 }, (_, index) => currentYear - index);
  };

  const months = generateMonths();
  const years = generateYears();

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
          <Question>{t('qProfessional')}</Question>
        </QuestionContainer>
        {experiences.map(experience => (
          <ExperienceItem key={experience.id}>
            <TextInputContainer>
              <TextInput
                type="text"
                placeholder={t('jobTitlePlaceholder')}
                value={experience.jobTitle}
                onChange={e =>
                  handleExperienceChange(
                    experience.id,
                    'jobTitle',
                    capitalizeFirstLetter(e.target.value),
                  )
                }
              />
            </TextInputContainer>

            <TextInputContainer>
              <TextInput
                type="text"
                placeholder={t('companyPlaceholder')}
                value={experience.company}
                onChange={e =>
                  handleExperienceChange(
                    experience.id,
                    'company',
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
                        {month}
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
                <InputLabel>{t('endDate')}</InputLabel>
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
                        {month}
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
                placeholder={t('jobDetailsPlaceholder')}
                value={experience.jobDetails}
                onChange={e =>
                  handleExperienceChange(
                    experience.id,
                    'jobDetails',
                    capitalizeFirstLetter(e.target.value),
                  )
                }
              />
            </TextInputContainer>
            <AddButtonContainer>
              <AddWorkExperience
                onClick={() => handleDeleteExperience(experience.id)}
              >
                {t('delete')}
              </AddWorkExperience>
            </AddButtonContainer>
          </ExperienceItem>
        ))}
        <AddWorkExperienceContainer>
          <AddWorkExperience onClick={handleAddExperience}>
            {t('addExperience')}
          </AddWorkExperience>
        </AddWorkExperienceContainer>
      </motion.div>
    </WorkExperienceContainer>
  );
};

export default WorkExperienceField;
