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
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('ResumeBuilder');
  const [summary, setSummary] = useState(professional.summary || '');
  const [currentRole, setCurrentRole] = useState(
    professional.currentRole || '',
  );
  const [checkedWorkIds, setCheckedWorkIds] = useState<string[]>(
    professional.work
      .filter(
        work => work.endDate?.month === 'present' && work.endDate?.year === '',
      )
      .map(work => work.id),
  );

  const [originalEndDates, setOriginalEndDates] = useState<
    Record<string, DateType>
  >({});

  const [isEnhancing, setIsEnhancing] = useState<Record<string, boolean>>({});
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  useEffect(() => {
    const newCheckedWorkIds: string[] = [];
    const newOriginalEndDates: Record<string, DateType> = {};

    professional.work.forEach(work => {
      if (work.endDate?.month === 'present' && work.endDate?.year === '') {
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
                  field === 'endDate'
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
    setIsGeneratingSummary(true);
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
      setIsGeneratingSummary(false);
    } catch (error) {
      console.error('Error generating summary:', error);
      setIsGeneratingSummary(false);
    }
  };

  const handleJobDescriptionEnhance = async (id: string) => {
    setIsEnhancing(prev => ({ ...prev, [id]: true }));
    try {
      const resp = await fetch('/api/cvRewritten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
      setIsEnhancing(prev => ({ ...prev, [id]: false }));
    } catch (error) {
      console.error('Error enhancing job description:', error);
      setIsEnhancing(prev => ({ ...prev, [id]: false }));
    }
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
      if (experience.endDate.month !== 'present') {
        setOriginalEndDates(prevDates => ({
          ...prevDates,
          [experienceId]: experience.endDate as DateType,
        }));
      }

      handleInputChange(experienceId, 'endDate', {
        month: 'present',
        year: '',
      });
      setCheckedWorkIds(prevCheckedIds => [...prevCheckedIds, experienceId]);
    } else {
      const originalEndDate = originalEndDates[experienceId];
      if (originalEndDate) {
        handleInputChange(experienceId, 'endDate', originalEndDate);
      } else {
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
          <InputLabel>{t('summary')}</InputLabel>
          <TextArea
            placeholder={t('summaryPlaceholder')}
            value={summary}
            onChange={e =>
              handleSummaryChange(capitalizeFirstLetter(e.target.value))
            }
            maxLength={600}
          />
          <ButtonsContainer>
            <EnhanceButton
              onClick={handleGenerateSummary}
              disabled={isGeneratingSummary}
              style={{
                backgroundColor: isGeneratingSummary ? '#5F607B' : '#494A66 ',
                cursor: isGeneratingSummary ? 'not-allowed' : 'pointer',
                color: isGeneratingSummary ? '#FFFFFF' : '#ffff',
              }}
            >
              {t('generateSummary')}{' '}
            </EnhanceButton>
          </ButtonsContainer>
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('currentRole')}</InputLabel>
          <Input
            type="text"
            placeholder="ex. Software developer"
            value={currentRole}
            onChange={e =>
              handleCurrentRoleChange(capitalizeFirstLetter(e.target.value))
            }
          />
        </InputContainer>
        <InputLabel>{t('workExperience')}</InputLabel>
        {professional.work.map(experience => (
          <WorkExperienceContainer key={experience.id}>
            <InputRow>
              <InputContainer>
                <InputLabel>{t('jobTitle')}</InputLabel>
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
                <InputLabel>{t('company')}</InputLabel>
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
                <InputLabel>{t('startDate')}</InputLabel>
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
                  <InputLabel>{t('endDate')}</InputLabel>
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
                      {t('present')}{' '}
                    </CheckboxLabel>
                  </CheckboxContainer>
                </InputLabelContainer>
                <DropdownContainer>
                  <MonthSelect
                    disabled={checkedWorkIds.includes(experience.id)}
                    value={
                      experience.endDate.month === 'present'
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
                      experience.endDate.month === 'present'
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
                <InputLabel>{t('jobDescription')}</InputLabel>
                <TextArea
                  placeholder={t('jobDescriptionPlaceholder')}
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
                disabled={isEnhancing[experience.id] || false}
                style={{
                  backgroundColor: isEnhancing[experience.id]
                    ? '#5F607B'
                    : '#494A66 ',
                  cursor: isEnhancing[experience.id]
                    ? 'not-allowed'
                    : 'pointer',
                  color: isEnhancing[experience.id] ? '#FFFFFF' : '#ffff',
                }}
              >
                {t('enhance')}
              </EnhanceButton>
              <TrashIcon
                onClick={() => handleDeleteWorkExperience(experience.id)}
              >
                {t('remove')}
              </TrashIcon>
            </ButtonsContainer>
          </WorkExperienceContainer>
        ))}
        <AddWorkExperienceContainer>
          <AddWorkExperienceButton onClick={handleAddWorkExperience}>
            {t('addNewExperience')}
          </AddWorkExperienceButton>
        </AddWorkExperienceContainer>
      </ProfessionalDetailsContainer>
    </Container>
  );
};

export default ProfessionalDetailsForm;
