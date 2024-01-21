'use client';

import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState
} from 'react';
import {
  AddWorkExperienceButton,
  AddWorkExperienceContainer,
  Container,
  DropdownContainer,
  Input,
  InputContainer,
  InputLabel,
  InputRow,
  MonthSelect,
  ProfessionalDetailsContainer,
  TextArea,
  WorkExperienceContainer,
  YearSelect
} from './ProfessionalDetailsForm.styles';
import { ProfessionalExperienceType, ResumeInfoType } from '@/types/profile';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/dashboard/recent-activity/RecentActivity.styles';

interface ProfessionalDetailsFormProps {
  resumeInfo: { professional: { work: ProfessionalExperienceType[] } };
  setResumeInfo: Dispatch<SetStateAction<ResumeInfoType>>;
  refreshStoredResume: () => void;
}

const ProfessionalDetailsForm: FC<ProfessionalDetailsFormProps> = ({
  resumeInfo,
  setResumeInfo,
  refreshStoredResume,
}) => {
  const [summary, setSummary] = useState('');
  const [currentRole, setCurrentRole] = useState('');

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

  const handleSummaryChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newSummary = event.target.value;
    setSummary(newSummary);

    setResumeInfo(prevInfo => ({
      ...prevInfo,
      professional: {
        ...prevInfo.professional,
        summary: newSummary
      }
    }));
    // console.log('newSummary', newSummary);
  };

  const handleCurrentRole = (event: ChangeEvent<HTMLInputElement>) => {
    const newCurrentRole = event.target.value;
    setCurrentRole(newCurrentRole);

    setResumeInfo(prevInfo => ({
      ...prevInfo,
      professional: {
        ...prevInfo.professional,
        currentRole: newCurrentRole
      }
    }));
  };

  const handleAddWorkExperience = () => {
    const newId = uuidv4();

    setResumeInfo(prevInfo => ({
      ...prevInfo,
      professional: {
        ...prevInfo.professional,
        work: [
          ...prevInfo.professional.work,
          {
            id: newId,
            jobTitle: '',
            company: '',
            startDate: { month: '01', year: `${new Date().getFullYear()}` }, // Initial values
            endDate: { month: '01', year: `${new Date().getFullYear()}` },
            jobDetails: ''
          }
        ]
      }
    }));
  };

  const handleInputChange = (
    id: string,
    field: keyof ProfessionalExperienceType,
    value: string | { month: string; year: string }
  ) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      professional: {
        ...prevInfo.professional,
        work: prevInfo.professional.work.map(experience =>
          experience.id === id ? { ...experience, [field]: value } : experience
        )
      }
    }));
  };

  const handleJobDesciptionEnhance = async (id: string) => {
    const resp = await fetch('/api/cvRewritten', {
      method: 'POST',
      body: JSON.stringify({
        id,
      }),
    });

    if (resp.status !== 201) {
      console.log('Error' + resp.status);
    }

    refreshStoredResume();
  };

  return (
    <Container>
      <ProfessionalDetailsContainer>
        <InputContainer>
          <InputLabel>Summary:</InputLabel>
          <TextArea
            placeholder="Introduce yourself by pitching your skills & explaining how they can be of value to a company"
            value={summary}
            onChange={handleSummaryChange}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>Current Role:</InputLabel>
          <Input
            type="text"
            placeholder="ex. Software developer"
            value={currentRole}
            onChange={handleCurrentRole}
          />
        </InputContainer>
        <InputLabel>Work Experience:</InputLabel>
        {resumeInfo.professional.work.map(experience => (
          <WorkExperienceContainer key={experience.id}>
            <InputRow>
              <InputContainer>
                <InputLabel>Job title:</InputLabel>
                <Input
                  type="text"
                  placeholder="ex. Software developer"
                  value={experience.jobTitle}
                  onChange={e =>
                    handleInputChange(experience.id, 'jobTitle', e.target.value)
                  }
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>Company:</InputLabel>
                <Input
                  type="text"
                  placeholder="Company name"
                  value={experience.company}
                  onChange={e =>
                    handleInputChange(experience.id, 'company', e.target.value)
                  }
                />
              </InputContainer>
            </InputRow>
            <InputRow>
              <InputContainer>
                <InputLabel>Start date:</InputLabel>
                <DropdownContainer>
                  <MonthSelect
                    value={experience.startDate.month}
                    onChange={e =>
                      handleInputChange(experience.id, 'startDate', {
                        ...experience.startDate,
                        month: e.target.value
                      })
                    }
                  >
                    {months.map(month => (
                      <option key={month} value={month}>
                        {new Date(2022, parseInt(month) - 1).toLocaleString(
                          'default',
                          {
                            month: 'long'
                          }
                        )}
                      </option>
                    ))}
                  </MonthSelect>
                  <YearSelect
                    value={experience.startDate.year}
                    onChange={e =>
                      handleInputChange(experience.id, 'startDate', {
                        ...experience.startDate,
                        year: e.target.value
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
                    value={experience.endDate.month}
                    onChange={e =>
                      handleInputChange(experience.id, 'endDate', {
                        ...experience.endDate,
                        month: e.target.value
                      })
                    }
                  >
                    {months.map(month => (
                      <option key={month} value={month}>
                        {new Date(2022, parseInt(month) - 1).toLocaleString(
                          'default',
                          {
                            month: 'long'
                          }
                        )}
                      </option>
                    ))}
                  </MonthSelect>
                  <YearSelect
                    value={experience.endDate.year}
                    onChange={e =>
                      handleInputChange(experience.id, 'endDate', {
                        ...experience.endDate,
                        year: e.target.value
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
            <InputLabel>Job details:</InputLabel>
            <TextArea
              placeholder="Describe your role and achievements"
              value={experience.jobDetails}
              onChange={e =>
                handleInputChange(experience.id, 'jobDetails', e.target.value)
              }
            />
            <Button onClick={() => handleJobDesciptionEnhance(experience.id)}>
              Enhance
            </Button>
          </WorkExperienceContainer>
        ))}

        <AddWorkExperienceContainer>
          <AddWorkExperienceButton onClick={handleAddWorkExperience}>
            Add work experience +
          </AddWorkExperienceButton>
        </AddWorkExperienceContainer>
      </ProfessionalDetailsContainer>
    </Container>
  );
};

export default ProfessionalDetailsForm;
