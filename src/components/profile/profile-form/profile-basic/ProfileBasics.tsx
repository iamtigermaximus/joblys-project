import React, { FC, useState } from 'react';
import { Profile } from '../../../../types/profile';
import { FaCircleChevronUp, FaCircleChevronDown } from 'react-icons/fa6';
import {
  AccordionSection,
  AccordionHeader,
  AccordionHeaderTitle,
  IconContainer,
  AccordionContent,
  BasicDetailsContainer,
  InputRow,
  InputContainer,
  InputLabel,
  Input,
  NewLinkContainer,
} from '../ProfileForm';

export interface ProfileBasicsProps {
  existingData: Profile;
  isOpen: boolean;
  toggleAccordion: () => void;
}

const ProfileBasics: FC<ProfileBasicsProps> = ({
  existingData,
  isOpen,
  toggleAccordion,
}) => {
  return (
    <AccordionSection>
      <AccordionHeader onClick={toggleAccordion}>
        <AccordionHeaderTitle style={{ color: isOpen ? '' : 'gray' }}>
          Personal Details
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
          <BasicDetailsContainer>
            <InputRow>
              <InputContainer>
                <InputLabel>First Name:</InputLabel>
                <Input
                  type="text"
                  placeholder="Your first name"
                  value={existingData.firstName}
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>Last Name:</InputLabel>
                <Input
                  type="text"
                  placeholder="Your last name"
                  value={existingData.lastName}
                />
              </InputContainer>
            </InputRow>
            <InputRow>
              <InputContainer>
                <InputLabel>Phone number:</InputLabel>
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={existingData.contact}
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>Email address:</InputLabel>
                <Input
                  type="email"
                  placeholder="Your email"
                  value={existingData.email}
                />
              </InputContainer>
            </InputRow>
            {existingData.links.map(link => (
              <InputContainer key={link.id}>
                <InputLabel>Link</InputLabel>
                <NewLinkContainer>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    value={link.url}
                  />
                </NewLinkContainer>
              </InputContainer>
            ))}
          </BasicDetailsContainer>
        </AccordionContent>
      )}
    </AccordionSection>
  );
};

export default ProfileBasics;
