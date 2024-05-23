import React, { FC } from 'react';
import { FaCircleChevronUp, FaCircleChevronDown } from 'react-icons/fa6';
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
} from '../ProfileForm';
import { Profile } from '@/types/profile';

export interface ProfileEducationProps {
  existingData: Profile;
  isOpen: boolean;
  toggleAccordion: () => void;
}

const ProfileEducation: FC<ProfileEducationProps> = ({
  existingData,
  isOpen,
  toggleAccordion,
}) => {
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
            {existingData.educational.map(educ => (
              <EducationContainer key={educ.id}>
                <InputRow>
                  <InputContainer>
                    <InputLabel>School:</InputLabel>
                    <Input type="text" value={educ.school} />
                  </InputContainer>
                  <InputContainer>
                    <InputLabel>Course/Degree:</InputLabel>
                    <Input type="text" value={educ.course} />
                  </InputContainer>
                </InputRow>
                <InputRow>
                  <InputContainer>
                    <InputLabel>Start date:</InputLabel>
                    <DateInfoContainer>
                      <Input type="text" value={educ.startDate.month} />
                      <Input type="text" value={educ.startDate.year} />
                    </DateInfoContainer>
                  </InputContainer>
                  <InputContainer>
                    <InputLabel>End date:</InputLabel>
                    <DateInfoContainer>
                      <Input type="text" value={educ.endDate.month} />
                      <Input type="text" value={educ.endDate.year} />
                    </DateInfoContainer>
                  </InputContainer>
                </InputRow>
              </EducationContainer>
            ))}
          </EducationalDetailsContainer>
        </AccordionContent>
      )}
    </AccordionSection>
  );
};

export default ProfileEducation;
