import React, { FC } from 'react';
import { Profile } from '../../../../types/profile';
import { FaCircleChevronUp, FaCircleChevronDown } from 'react-icons/fa6';
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
} from '../ProfileForm';

export interface ProfileProfessionalProps {
  existingData: Profile;
  isOpen: boolean;
  toggleAccordion: () => void;
}

const ProfileProfessional: FC<ProfileProfessionalProps> = ({
  existingData,
  isOpen,
  toggleAccordion,
}) => {
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
            {existingData.professional.map(work => (
              <ProfessionalContainer key={work.id}>
                <InputRow>
                  <InputContainer>
                    <InputLabel>Job Title:</InputLabel>
                    <Input type="text" value={work.jobTitle} />
                  </InputContainer>
                  <InputContainer>
                    <InputLabel>Company:</InputLabel>
                    <Input type="text" value={work.company} />
                  </InputContainer>
                </InputRow>
                <InputRow>
                  <InputContainer>
                    <InputLabel>Start date:</InputLabel>
                    <DateInfoContainer>
                      <Input type="text" value={work.startDate.month} />
                      <Input type="text" value={work.startDate.year} />
                    </DateInfoContainer>
                  </InputContainer>
                  <InputContainer>
                    <InputLabel>End date:</InputLabel>
                    <DateInfoContainer>
                      <Input type="text" value={work.endDate.month} />
                      <Input type="text" value={work.endDate.year} />
                    </DateInfoContainer>
                  </InputContainer>
                </InputRow>
                <InputLabel>Job details:</InputLabel>
                <ItemContainer>
                  <TextArea
                    placeholder="Describe your role and achievements"
                    value={work.jobDetails}
                  />
                </ItemContainer>
              </ProfessionalContainer>
            ))}
          </ProfessionalDetailsContainer>
        </AccordionContent>
      )}
    </AccordionSection>
  );
};

export default ProfileProfessional;
