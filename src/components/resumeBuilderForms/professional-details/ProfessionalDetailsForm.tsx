'use client';

import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  AddWorkExperienceButton,
  AddWorkExperienceContainer,
  ButtonsContainer,
  CheckboxInput,
  Container,
  DropdownContainer,
  EnhanceButton,
  Input,
  InputContainer,
  InputLabel,
  InputLabelContainer,
  InputRow,
  MonthSelect,
  ProfessionalDetailsContainer,
  TextArea,
  TrashIcon,
  WorkExperienceContainer,
  YearSelect,
} from './ProfessionalDetailsForm.styles';
import { ProfessionalExperienceType, Resume } from '@/types/profile';
import { v4 as uuidv4 } from 'uuid';
import { capitalizeFirstLetter } from '@/components/helpers/formHelpers';

interface ProfessionalDetailsFormProps {
  resumeId: string;
  professional: {
    summary: string;
    currentRole: string;
    work: ProfessionalExperienceType[];
  };
  setResumeInfo: Dispatch<SetStateAction<Resume>>;
  refreshStoredResume: () => void;
}

const ProfessionalDetailsForm: FC<ProfessionalDetailsFormProps> = ({
  resumeId,
  professional,
  setResumeInfo,
  refreshStoredResume,
}) => {
  const [summary, setSummary] = useState(professional.summary || '');
  const [currentRole, setCurrentRole] = useState(
    professional.currentRole || '',
  );
  const [applyJobDescription, setApplyJobDescription] = useState('');
  const [checkedWorkIds, setCheckedWorkIds] = useState<string[]>([]);

  const handleSummaryChange = (newSummary: string) => {
    setSummary(newSummary);
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      professional: {
        ...prevInfo.professional,
        summary: newSummary,
      },
    }));
  };

  const handleCurrentRoleChange = (newCurrentRole: string) => {
    setCurrentRole(newCurrentRole);
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      professional: {
        ...prevInfo.professional,
        currentRole: newCurrentRole,
      },
    }));
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

  const monthPlaceholderOption = <option value="">Month</option>;
  const yearPlaceholderOption = <option value="">Year</option>;

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
            startDate: { month: '01', year: `${new Date().getFullYear()}` },
            endDate: { month: '01', year: `${new Date().getFullYear()}` },
            jobDetails: '',
          },
        ],
      },
    }));
  };

  const handleInputChange = (
    id: string,
    field: keyof ProfessionalExperienceType,
    value: string | { month: string; year: string },
  ) => {
    if (typeof value === 'string') {
      setResumeInfo(prevInfo => ({
        ...prevInfo,
        professional: {
          ...prevInfo.professional,
          work: prevInfo.professional.work.map(experience =>
            experience.id === id
              ? { ...experience, [field]: value }
              : experience,
          ),
        },
      }));
    } else {
      setResumeInfo(prevInfo => ({
        ...prevInfo,
        professional: {
          ...prevInfo.professional,
          work: prevInfo.professional.work.map(experience =>
            experience.id === id
              ? { ...experience, [field]: value }
              : experience,
          ),
        },
      }));
    }
  };

  const handleJobDesciptionEnhance = async (id: string) => {
    const resp = await fetch('/api/cvRewritten', {
      method: 'POST',
      body: JSON.stringify({
        resumeId,
        id,
      }),
    });

    if (resp.status !== 201) {
      console.log('Error ' + resp.status);
      return;
    }

    refreshStoredResume();
  };

  const handleDeleteWorkExperience = (id: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      professional: {
        ...prevInfo.professional,
        work: prevInfo.professional.work.filter(
          experience => experience.id !== id,
        ),
      },
    }));
  };

  const handleCheckboxChange = (
    isChecked: boolean,
    experience: ProfessionalExperienceType,
  ) => {
    setCheckedWorkIds(prevCheckedIds => {
      if (isChecked) {
        handleInputChange(experience.id, 'endDate', 'present');
      } else {
        handleInputChange(experience.id, 'endDate', {
          ...(typeof experience.endDate === 'string'
            ? { month: '', year: '' }
            : experience.endDate),
        });
      }
      return isChecked
        ? [...prevCheckedIds, experience.id]
        : prevCheckedIds.filter(id => id !== experience.id);
    });
  };

  const handleApplyJobDescriptionChange = async (jobDescription: string) => {
    setApplyJobDescription(jobDescription);
  };

  const handleCVMatchJobDescription = async (jobDescription: string) => {
    const resp = await fetch('/api/cvRewrittenWithJobDescription', {
      method: 'POST',
      body: JSON.stringify({
        jobDescription,
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
        {/* <InputContainer>
          <InputLabel>Job description</InputLabel>
          <TextArea
            placeholder="Paste job description here"
            value={applyJobDescription}
            onChange={e => handleApplyJobDescriptionChange(e.target.value)}
          />
        </InputContainer> */}
        {/* <ButtonsContainer>
          <EnhanceButton
            onClick={() => handleCVMatchJobDescription(applyJobDescription)}
          >
            Enhance to match job ad
          </EnhanceButton>
        </ButtonsContainer> */}
        <InputContainer>
          <InputLabel>Summary:</InputLabel>
          <TextArea
            placeholder="Introduce yourself by pitching your skills & explaining how they can be of value to a company"
            value={summary}
            onChange={e =>
              handleSummaryChange(capitalizeFirstLetter(e.target.value))
            }
            maxLength={600}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>Current Role:</InputLabel>
          <Input
            type="text"
            placeholder="ex. Software developer"
            value={currentRole}
            onChange={e =>
              handleCurrentRoleChange(capitalizeFirstLetter(e.target.value))
            }
          />
        </InputContainer>
        <InputLabel>Work Experience:</InputLabel>
        {professional.work.map(experience => (
          <WorkExperienceContainer key={experience.id}>
            <InputRow>
              <InputContainer>
                <InputLabel>Job title:</InputLabel>
                <Input
                  type="text"
                  placeholder="ex. Software developer"
                  value={experience.jobTitle}
                  onChange={e =>
                    handleInputChange(
                      experience.id,
                      'jobTitle',
                      capitalizeFirstLetter(e.target.value),
                    )
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
                    handleInputChange(
                      experience.id,
                      'company',
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
                    value={experience.startDate.month}
                    onChange={e =>
                      handleInputChange(experience.id, 'startDate', {
                        ...experience.startDate,
                        month: e.target.value,
                      })
                    }
                  >
                    {monthPlaceholderOption}
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
                    value={experience.startDate.year}
                    onChange={e =>
                      handleInputChange(experience.id, 'startDate', {
                        ...experience.startDate,
                        year: e.target.value,
                      })
                    }
                  >
                    {yearPlaceholderOption}
                    {years.map(year => (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    ))}
                  </YearSelect>
                </DropdownContainer>
              </InputContainer>
              <InputContainer>
                <InputLabelContainer>
                  <InputLabel>End date:</InputLabel>
                  <InputLabel>
                    <CheckboxInput
                      type="checkbox"
                      checked={checkedWorkIds.includes(experience.id)}
                      onChange={e => {
                        const isChecked = e.target.checked;
                        handleCheckboxChange(isChecked, experience);
                      }}
                    />
                    Present
                  </InputLabel>
                </InputLabelContainer>
                {checkedWorkIds.includes(experience.id) ? (
                  <DropdownContainer>
                    <MonthSelect
                      disabled
                      value={
                        typeof experience.endDate === 'string'
                          ? ''
                          : experience.endDate.month
                      }
                      onChange={e =>
                        handleInputChange(experience.id, 'endDate', {
                          ...(typeof experience.endDate === 'string'
                            ? { month: '', year: '' }
                            : experience.endDate),
                          month: e.target.value,
                        })
                      }
                    >
                      {monthPlaceholderOption}
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
                      disabled
                      value={
                        typeof experience.endDate === 'string'
                          ? ''
                          : experience.endDate.year
                      }
                      onChange={e =>
                        handleInputChange(experience.id, 'endDate', {
                          ...(typeof experience.endDate === 'string'
                            ? { month: '', year: '' }
                            : experience.endDate),
                          year: e.target.value,
                        })
                      }
                    >
                      {yearPlaceholderOption}
                      {years.map(year => (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      ))}
                    </YearSelect>
                  </DropdownContainer>
                ) : (
                  <DropdownContainer>
                    <MonthSelect
                      value={
                        typeof experience.endDate === 'string'
                          ? ''
                          : experience.endDate.month
                      }
                      onChange={e =>
                        handleInputChange(experience.id, 'endDate', {
                          ...(typeof experience.endDate === 'string'
                            ? { month: '', year: '' }
                            : experience.endDate),
                          month: e.target.value,
                        })
                      }
                    >
                      {monthPlaceholderOption}
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
                      value={
                        typeof experience.endDate === 'string'
                          ? ''
                          : experience.endDate.year
                      }
                      onChange={e =>
                        handleInputChange(experience.id, 'endDate', {
                          ...(typeof experience.endDate === 'string'
                            ? { month: '', year: '' }
                            : experience.endDate),
                          year: e.target.value,
                        })
                      }
                    >
                      {yearPlaceholderOption}
                      {years.map(year => (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      ))}
                    </YearSelect>
                  </DropdownContainer>
                )}
              </InputContainer>
            </InputRow>
            <InputLabel>Job details:</InputLabel>
            <TextArea
              placeholder="Describe your role and achievements"
              value={experience.jobDetails}
              onChange={e =>
                handleInputChange(
                  experience.id,
                  'jobDetails',
                  capitalizeFirstLetter(e.target.value),
                )
              }
              maxLength={600}
            />
            <ButtonsContainer>
              <EnhanceButton
                onClick={() => handleJobDesciptionEnhance(experience.id)}
              >
                Enhance
              </EnhanceButton>
              <TrashIcon
                onClick={() => handleDeleteWorkExperience(experience.id)}
              >
                Remove
              </TrashIcon>
            </ButtonsContainer>
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
