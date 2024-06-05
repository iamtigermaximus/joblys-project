import React, { FC, useEffect, useState } from 'react';
import { Profile } from '../../../../types/profile';
import {
  FaCircleChevronUp,
  FaCircleChevronDown,
  FaCheck,
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
} from '../ProfileForm';
import { FaEdit, FaTimes } from 'react-icons/fa';

export interface ProfileProfessionalProps {
  existingData: Profile;
  isOpen: boolean;
  toggleAccordion: () => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancelEdit: () => void;
  handleSaveEdit: () => void;
}

const ProfileProfessional: FC<ProfileProfessionalProps> = ({
  existingData,
  isOpen,
  toggleAccordion,
  isEditing,
  setIsEditing,
  handleCancelEdit,
  handleSaveEdit,
}) => {
  const [workData, setWorkData] = useState(existingData.professional);

  useEffect(() => {
    if (existingData.professional && existingData.professional.length > 0) {
      setWorkData(existingData.professional);
    } else {
      setWorkData([
        {
          id: '',
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
    fieldName: string,
  ) => {
    const { value } = e.target;
    setWorkData(prevData =>
      prevData.map(work =>
        work.id === id ? { ...work, [fieldName]: value } : work,
      ),
    );
  };

  return (
    <AccordionSection>
      <AccordionHeader onClick={toggleAccordion}>
        <AccordionHeaderTitle style={{ color: isOpen ? '' : 'gray' }}>
          Professional Details
        </AccordionHeaderTitle>
        <span>
          {isOpen ? (
            <IconContainer style={{ fontSize: '24px' }}>
              <FaCircleChevronUp />
            </IconContainer>
          ) : (
            <IconContainer style={{ fontSize: '24px' }}>
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
                          handleInputChange(e, work.id, 'startDate')
                        }
                        readOnly={!isEditing}
                      />
                      <Input
                        type="text"
                        value={work.startDate.year}
                        onChange={e =>
                          handleInputChange(e, work.id, 'startDate')
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
                        onChange={e => handleInputChange(e, work.id, 'endDate')}
                        readOnly={!isEditing}
                      />
                      <Input
                        type="text"
                        value={work.endDate.year}
                        onChange={e =>
                          handleInputChange(e, work.id, 'startDate')
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
