import React, { FC, useEffect, useState } from 'react';
import { Profile, WorkExperience, DateInfo } from '../../../../types/profile';
import {
  FaCircleChevronUp,
  FaCircleChevronDown,
  FaCheck,
  FaTrash,
} from 'react-icons/fa6';
import {
  AccordionSection,
  AccordionHeader,
  AccordionHeaderTitle,
  IconContainer,
  AccordionContent,
  ProfessionalDetailsContainer,
  ProfessionalContainer,
  InputRow,
  InputContainer,
  InputLabel,
  Input,
  DateInfoContainer,
  ItemContainer,
  TextArea,
  Button,
  ButtonContainer,
  ActionButton,
  ActionButtonContainer,
  AddButtonContainer,
  AddButton,
  TrashIconContainer,
} from '../ProfileForm.styles';
import { FaEdit, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export interface ProfileProfessionalProps {
  existingData: Profile;
  setExistingData: React.Dispatch<React.SetStateAction<Profile | null>>;
  isOpen: boolean;
  toggleAccordion: () => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancelEdit: () => void;
}

const ProfileProfessional: FC<ProfileProfessionalProps> = ({
  existingData,
  isOpen,
  toggleAccordion,
  isEditing,
  setIsEditing,
  handleCancelEdit,
  setExistingData,
}) => {
  const [workData, setWorkData] = useState<WorkExperience[]>(
    existingData.professional || [],
  );

  useEffect(() => {
    if (existingData.professional && existingData.professional.length > 0) {
      // Ensure all work experiences have a unique ID
      setWorkData(
        existingData.professional.map(job =>
          job.id ? job : { ...job, id: uuidv4() },
        ),
      );
    } else {
      setWorkData([
        {
          id: uuidv4(),
          jobTitle: '',
          company: '',
          startDate: { month: '', year: '' },
          endDate: { month: '', year: '' },
          jobDetails: '',
        },
      ]);
    }
  }, [existingData.professional]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string,
    fieldName: keyof WorkExperience,
    subFieldName?: keyof DateInfo,
  ) => {
    const { value } = e.target;
    setWorkData(prevData =>
      prevData.map(work => {
        if (work.id === id) {
          if (fieldName === 'startDate' || fieldName === 'endDate') {
            return {
              ...work,
              [fieldName]: {
                ...work[fieldName],
                [subFieldName!]: value,
              },
            };
          }
          return {
            ...work,
            [fieldName]: value,
          };
        }
        return work;
      }),
    );
  };

  const handleAddExperience = () => {
    // Add a new work experience with a unique ID
    const newExperience: WorkExperience = {
      id: uuidv4(),
      jobTitle: '',
      company: '',
      startDate: { month: '', year: '' },
      endDate: { month: '', year: '' },
      jobDetails: '',
    };
    setWorkData(prevData => [...prevData, newExperience]);
  };

  const handleDeleteExperience = (id: string) => {
    // Remove work experience by its ID
    setWorkData(prevData =>
      prevData.filter(experience => experience.id !== id),
    );
  };

  const updateProfessionalData = async (professional: WorkExperience[]) => {
    try {
      const response = await axios.post('/api/profile', {
        profile: { ...existingData, professional },
      });
      if (response.status === 200) {
        console.log('Work experience updated successfully');
        setExistingData(prev => ({
          ...prev!,
          professional,
        }));
      } else {
        console.error('Failed to update work experience');
      }
    } catch (error) {
      console.error('Error updating work experience:', error);
    }
  };

  const handleSaveEdit = async () => {
    await updateProfessionalData(workData);
    setIsEditing(false);
  };

  return (
    <AccordionSection>
      <AccordionHeader onClick={toggleAccordion}>
        <AccordionHeaderTitle style={{ color: isOpen ? '' : 'gray' }}>
          Professional Details
        </AccordionHeaderTitle>
        <span>
          {isOpen ? (
            <IconContainer style={{ fontSize: '24px', color: '#2e033b' }}>
              <FaCircleChevronUp />
            </IconContainer>
          ) : (
            <IconContainer style={{ fontSize: '24px', color: '#2e033b' }}>
              <FaCircleChevronDown />
            </IconContainer>
          )}
        </span>
      </AccordionHeader>
      {isOpen && (
        <AccordionContent>
          <ProfessionalDetailsContainer>
            <ButtonContainer>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)}>
                  <FaEdit /> Edit
                </Button>
              )}
            </ButtonContainer>
            {workData.map(work => (
              <ProfessionalContainer key={work.id}>
                <div>
                  {isEditing && (
                    <TrashIconContainer
                      onClick={() => handleDeleteExperience(work.id)}
                    >
                      <FaTrash style={{ color: '#2e033b' }} />
                    </TrashIconContainer>
                  )}
                </div>
                <InputRow>
                  <InputContainer>
                    <InputLabel>Job Title:</InputLabel>
                    <Input
                      type="text"
                      name="jobTitle"
                      placeholder="Job Title"
                      value={work.jobTitle}
                      onChange={e => handleInputChange(e, work.id, 'jobTitle')}
                      readOnly={!isEditing}
                    />
                  </InputContainer>
                  <InputContainer>
                    <InputLabel>Company:</InputLabel>
                    <Input
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={work.company}
                      onChange={e => handleInputChange(e, work.id, 'company')}
                      readOnly={!isEditing}
                    />
                  </InputContainer>
                </InputRow>
                <InputRow>
                  <InputContainer>
                    <InputLabel>Start date:</InputLabel>
                    <DateInfoContainer>
                      <Input
                        type="text"
                        value={work.startDate.month}
                        onChange={e =>
                          handleInputChange(e, work.id, 'startDate', 'month')
                        }
                        readOnly={!isEditing}
                      />
                      <Input
                        type="text"
                        value={work.startDate.year}
                        onChange={e =>
                          handleInputChange(e, work.id, 'startDate', 'year')
                        }
                        readOnly={!isEditing}
                      />
                    </DateInfoContainer>
                  </InputContainer>
                  <InputContainer>
                    <InputLabel>End date:</InputLabel>
                    <DateInfoContainer>
                      <Input
                        type="text"
                        value={work.endDate.month}
                        onChange={e =>
                          handleInputChange(e, work.id, 'endDate', 'month')
                        }
                        readOnly={!isEditing}
                      />
                      <Input
                        type="text"
                        value={work.endDate.year}
                        onChange={e =>
                          handleInputChange(e, work.id, 'endDate', 'year')
                        }
                        readOnly={!isEditing}
                      />
                    </DateInfoContainer>
                  </InputContainer>
                </InputRow>
                <InputRow>
                  <InputLabel>Job details:</InputLabel>
                  <ItemContainer></ItemContainer>
                  <ItemContainer>
                    <TextArea
                      name="jobDetails"
                      placeholder="Describe your role and achievements"
                      value={work.jobDetails}
                      onChange={e =>
                        handleInputChange(e, work.id, 'jobDetails')
                      }
                      readOnly={!isEditing}
                    />
                  </ItemContainer>
                </InputRow>
              </ProfessionalContainer>
            ))}
            {isEditing && (
              <AddButtonContainer>
                <AddButton onClick={handleAddExperience}>
                  Add new experience
                </AddButton>
              </AddButtonContainer>
            )}
            {isEditing && (
              <ActionButtonContainer>
                <ActionButton onClick={handleCancelEdit}>
                  <FaTimes /> Cancel
                </ActionButton>
                <ActionButton onClick={handleSaveEdit}>
                  <FaCheck /> Done
                </ActionButton>
              </ActionButtonContainer>
            )}
          </ProfessionalDetailsContainer>
        </AccordionContent>
      )}
    </AccordionSection>
  );
};

export default ProfileProfessional;
