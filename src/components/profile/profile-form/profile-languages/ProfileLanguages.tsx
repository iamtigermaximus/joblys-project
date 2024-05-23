import React, { FC } from 'react';
import { Profile } from '../../../../types/profile';
import { FaCircleChevronUp, FaCircleChevronDown } from 'react-icons/fa6';
import {
  AccordionSection,
  AccordionHeader,
  AccordionHeaderTitle,
  IconContainer,
  AccordionContent,
  LanguagesDetailsContainer,
  LanguagesContainer,
  ItemContainer,
  Input,
} from '../ProfileForm';

export interface ProfileLanguagesProps {
  existingData: Profile;
  isOpen: boolean;
  toggleAccordion: () => void;
}

const ProfileLanguages: FC<ProfileLanguagesProps> = ({
  existingData,
  isOpen,
  toggleAccordion,
}) => {
  return (
    <AccordionSection>
      <AccordionHeader onClick={toggleAccordion}>
        <AccordionHeaderTitle style={{ color: isOpen ? '' : 'gray' }}>
          Languages
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
          <LanguagesDetailsContainer>
            {existingData.languages.map(language => (
              <LanguagesContainer key={language.id}>
                <ItemContainer>
                  <Input value={language.name} />
                </ItemContainer>
              </LanguagesContainer>
            ))}
          </LanguagesDetailsContainer>
        </AccordionContent>
      )}
    </AccordionSection>
  );
};

export default ProfileLanguages;
