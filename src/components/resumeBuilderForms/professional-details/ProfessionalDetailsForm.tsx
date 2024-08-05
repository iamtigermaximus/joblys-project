'use client';

import React, {
  Dispatch,
  FC,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import {
  AddWorkExperienceButton,
  AddWorkExperienceContainer,
  ButtonsContainer,
  CheckboxContainer,
  CheckboxInput,
  CheckboxLabel,
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
import { DateType, ProfessionalExperienceType, Resume } from '@/types/resume';
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
  const [checkedWorkIds, setCheckedWorkIds] = useState<string[]>(
    professional.work
      .filter(work => work.endDate === 'present')
      .map(work => work.id),
  );
  const [originalEndDates, setOriginalEndDates] = useState<
    Record<string, DateType>
  >({});

  useEffect(() => {
    const newCheckedWorkIds: string[] = [];
    const newOriginalEndDates: Record<string, DateType> = {};

    professional.work.forEach(work => {
      if (work.endDate === 'present') {
        newCheckedWorkIds.push(work.id);
      } else if (typeof work.endDate === 'object') {
        newOriginalEndDates[work.id] = work.endDate;
      }
    });

    setCheckedWorkIds(newCheckedWorkIds);
    setOriginalEndDates(newOriginalEndDates);
  }, [professional.work]);

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

  const handleAddWorkExperience = () => {
    const newId = uuidv4();
    const currentYear = new Date().getFullYear().toString();

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
            startDate: { month: 'January', year: currentYear },
            endDate: { month: 'January', year: currentYear },
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
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      professional: {
        ...prevInfo.professional,
        work: prevInfo.professional.work.map(experience =>
          experience.id === id
            ? {
                ...experience,
                [field]:
                  field === 'endDate' || field === 'startDate'
                    ? typeof value === 'string'
                      ? value
                      : { ...(experience[field] as DateType), ...value }
                    : value,
              }
            : experience,
        ),
      },
    }));
  };

  const handleGenerateSummary = async () => {
    try {
      const payload = {
        resumeId,
        professionalDetails: professional,
      };
      console.log('Sending request to generate summary with payload:', payload);

      const response = await fetch('/api/writeSummary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      setSummary(data.generatedSummary);
      setResumeInfo(prevInfo => ({
        ...prevInfo,
        professional: {
          ...prevInfo.professional,
          summary: data.generatedSummary,
        },
      }));
    } catch (error) {
      console.error('Error generating summary:', error);
    }
  };

  const handleJobDescriptionEnhance = async (id: string) => {
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

  const handleCheckboxChange = (isChecked: boolean, experienceId: string) => {
    const experience = professional.work.find(work => work.id === experienceId);

    if (!experience) return;

    if (isChecked) {
      // Save the current end date if it's not 'present'
      if (experience.endDate !== 'present') {
        setOriginalEndDates(prevDates => ({
          ...prevDates,
          [experienceId]: experience.endDate as DateType,
        }));
      }

      // Set end date to 'present'
      handleInputChange(experienceId, 'endDate', 'present');
      setCheckedWorkIds(prevCheckedIds => [...prevCheckedIds, experienceId]);
    } else {
      // Restore the original end date if it was saved
      const originalEndDate = originalEndDates[experienceId];
      if (originalEndDate) {
        handleInputChange(experienceId, 'endDate', originalEndDate);
      } else {
        // If no original end date was saved, set to default empty state
        handleInputChange(experienceId, 'endDate', { month: '', year: '' });
      }
      setCheckedWorkIds(prevCheckedIds =>
        prevCheckedIds.filter(id => id !== experienceId),
      );
    }
  };

  return (
    <Container>
      <ProfessionalDetailsContainer>
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
          <ButtonsContainer>
            <EnhanceButton onClick={handleGenerateSummary}>
              Generate summary
            </EnhanceButton>
          </ButtonsContainer>
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
                    {months.map(month => (
                      <option key={month} value={month}>
                        {month}
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
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </YearSelect>
                </DropdownContainer>
              </InputContainer>
              <InputContainer>
                <InputLabelContainer>
                  <InputLabel>End date:</InputLabel>
                  <CheckboxContainer>
                    <CheckboxInput
                      type="checkbox"
                      id={`present-${experience.id}`}
                      checked={checkedWorkIds.includes(experience.id)}
                      onChange={e =>
                        handleCheckboxChange(e.target.checked, experience.id)
                      }
                    />
                    <CheckboxLabel htmlFor={`present-${experience.id}`}>
                      Present
                    </CheckboxLabel>
                  </CheckboxContainer>
                </InputLabelContainer>
                <DropdownContainer>
                  <MonthSelect
                    disabled={checkedWorkIds.includes(experience.id)}
                    value={
                      typeof experience.endDate === 'string'
                        ? ''
                        : experience.endDate.month
                    }
                    onChange={e =>
                      handleInputChange(experience.id, 'endDate', {
                        ...((experience.endDate as DateType) || {}),
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
                    disabled={checkedWorkIds.includes(experience.id)}
                    value={
                      typeof experience.endDate === 'string'
                        ? ''
                        : experience.endDate.year
                    }
                    onChange={e =>
                      handleInputChange(experience.id, 'endDate', {
                        ...((experience.endDate as DateType) || {}),
                        year: e.target.value,
                      })
                    }
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
            <InputRow>
              <InputContainer>
                <InputLabel>Job description:</InputLabel>
                <TextArea
                  placeholder="Job duties & accomplishments"
                  value={experience.jobDetails}
                  onChange={e =>
                    handleInputChange(
                      experience.id,
                      'jobDetails',
                      e.target.value,
                    )
                  }
                />
              </InputContainer>
            </InputRow>
            <ButtonsContainer>
              <EnhanceButton
                onClick={() => handleJobDescriptionEnhance(experience.id)}
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
            Add work experience
          </AddWorkExperienceButton>
        </AddWorkExperienceContainer>
      </ProfessionalDetailsContainer>
    </Container>
  );
};

export default ProfessionalDetailsForm;
