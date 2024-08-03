import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { WorkExperience } from '@/types/profile';
import { capitalizeFirstLetter } from '../../helpers/formHelpers';
import {
  AddWorkExperience,
  AddWorkExperienceContainer,
  DateContainer,
  DropdownContainer,
  ExperienceItem,
  InputLabel,
  MonthSelect,
  QuestionContainer,
  TextArea,
  TextInput,
  TextInputContainer,
  WorkExperienceContainer,
  YearSelect,
} from './WorkExperienceField.styles';

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

interface WorkExperienceFieldProps {
  value: WorkExperience[];
  onChange: (value: WorkExperience[]) => void;
}

const WorkExperienceField: React.FC<WorkExperienceFieldProps> = ({
  value,
  onChange,
}) => {
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

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 50 }, (_, index) => currentYear - index);
  };

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
          <h4>7. Provide your professional details:</h4>
        </QuestionContainer>
        {experiences.map(experience => (
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
                    capitalizeFirstLetter(e.target.value),
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
                    capitalizeFirstLetter(e.target.value),
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
                    {monthNames.map(month => (
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
                    {monthNames.map(month => (
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
                placeholder="Job Details"
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
