import React, { FC, useEffect, useState } from 'react';
import {
  FaCircleChevronUp,
  FaCircleChevronDown,
  FaCheck,
} from 'react-icons/fa6';
import { FaEdit, FaTimes } from 'react-icons/fa';
import {
  AccordionSection,
  AccordionHeader,
  AccordionHeaderTitle,
  IconContainer,
  AccordionContent,
  EducationalDetailsContainer,
  EducationContainer,
  InputRow,
  InputContainer,
  InputLabel,
  Input,
  DateInfoContainer,
  ButtonContainer,
  Button,
  ActionButton,
  ActionButtonContainer,
} from '../ProfileForm.styles';
import { Education, Profile, DateInfo } from '@/types/profile';
import axios from 'axios';

export interface ProfileEducationProps {
  existingData: Profile;
  isOpen: boolean;
  toggleAccordion: () => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancelEdit: () => void;
  // handleSaveEdit: () => void;
}

const ProfileEducation: FC<ProfileEducationProps> = ({
  existingData,
  isOpen,
  toggleAccordion,
  isEditing,
  setIsEditing,
  handleCancelEdit,
  // handleSaveEdit,
}) => {
  const [educationData, setEducationData] = useState<Education[]>(
    existingData.educational,
  );

  useEffect(() => {
    if (existingData.educational && existingData.educational.length > 0) {
      setEducationData(existingData.educational);
    } else {
      setEducationData([
        {
          id: '',
          school: '',
          course: '',
          startDate: { month: '', year: '' },
          endDate: { month: '', year: '' },
          description: '',
        },
      ]);
    }
  }, [existingData.educational]);

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   id: string,
  //   fieldName: string,
  // ) => {
  //   const { value } = e.target;
  //   setEducationData(prevData =>
  //     prevData.map(educ =>
  //       educ.id === id ? { ...educ, [fieldName]: value } : educ,
  //     ),
  //   );
  // };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    fieldName: keyof Education,
    subFieldName?: keyof DateInfo,
  ) => {
    const { value } = e.target;
    setEducationData(prevData =>
      prevData.map(educ => {
        if (educ.id === id) {
          if (fieldName === 'startDate' || fieldName === 'endDate') {
            return {
              ...educ,
              [fieldName]: {
                ...educ[fieldName],
                [subFieldName!]: value,
              },
            };
          }
          return {
            ...educ,
            [fieldName]: value,
          };
        }
        return educ;
      }),
    );
  };
  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   id: string,
  //   fieldName: keyof Education,
  //   subFieldName?: keyof Education['startDate'] | keyof Education['endDate'],
  // ) => {
  //   const { value } = e.target;
  //   setEducationData(prevData =>
  //     prevData.map(educ => {
  //       if (educ.id === id) {
  //         if (
  //           subFieldName &&
  //           (fieldName === 'startDate' || fieldName === 'endDate')
  //         ) {
  //           return {
  //             ...educ,
  //             [fieldName]: {
  //               ...educ[fieldName],
  //               [subFieldName]: value,
  //             },
  //           };
  //         }
  //         return {
  //           ...educ,
  //           [fieldName]: value,
  //         };
  //       }
  //       return educ;
  //     }),
  //   );
  // };

  const updateEducationData = async (educational: Education[]) => {
    try {
      const response = await axios.post('/api/profile', {
        profile: { ...existingData, educational },
      });
      if (response.status === 200) {
        console.log('Education updated successfully');
      } else {
        console.error('Failed to update education');
      }
    } catch (error) {
      console.error('Error updating education:', error);
    }
  };

  const handleSaveEdit = async () => {
    await updateEducationData(educationData);
    setIsEditing(false);
  };

  return (
    <AccordionSection>
      <AccordionHeader onClick={toggleAccordion}>
        <AccordionHeaderTitle style={{ color: isOpen ? '' : 'gray' }}>
          Educational Details
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
          <EducationalDetailsContainer>
            <ButtonContainer>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)}>
                  <FaEdit /> Edit
                </Button>
              )}
            </ButtonContainer>
            {educationData.map(educ => (
              <EducationContainer key={educ.id}>
                <InputRow>
                  <InputContainer>
                    <InputLabel>School:</InputLabel>
                    <Input
                      type="text"
                      name="school"
                      placeholder="School"
                      value={educ.school}
                      onChange={e => handleInputChange(e, educ.id, 'school')}
                      readOnly={!isEditing}
                    />
                  </InputContainer>
                  <InputContainer>
                    <InputLabel>Course/Degree:</InputLabel>
                    <Input
                      type="text"
                      name="course"
                      placeholder="Course"
                      value={educ.course}
                      onChange={e => handleInputChange(e, educ.id, 'course')}
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
                        value={educ.startDate.month}
                        onChange={e =>
                          handleInputChange(e, educ.id, 'startDate', 'month')
                        }
                        readOnly={!isEditing}
                      />
                      <Input
                        type="text"
                        value={educ.startDate.year}
                        onChange={e =>
                          handleInputChange(e, educ.id, 'startDate', 'year')
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
                        value={educ.endDate.month}
                        onChange={e =>
                          handleInputChange(e, educ.id, 'endDate', 'month')
                        }
                        readOnly={!isEditing}
                      />
                      <Input
                        type="text"
                        value={educ.endDate.year}
                        onChange={e =>
                          handleInputChange(e, educ.id, 'endDate', 'year')
                        }
                        readOnly={!isEditing}
                      />
                    </DateInfoContainer>
                  </InputContainer>
                </InputRow>
              </EducationContainer>
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
          </EducationalDetailsContainer>
        </AccordionContent>
      )}
    </AccordionSection>
  );
};

export default ProfileEducation;
