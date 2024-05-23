import React, { FC } from 'react';
import { Profile } from '../../../../types/profile';
import { FaCircleChevronUp, FaCircleChevronDown } from 'react-icons/fa6';
import {
  AccordionSection,
  AccordionHeader,
  AccordionHeaderTitle,
  IconContainer,
  AccordionContent,
  SkillsDetailsContainer,
  SkillsContainer,
  ItemContainer,
  Input,
} from '../ProfileForm';

export interface ProfileSkillsProps {
  existingData: Profile;
  isOpen: boolean;
  toggleAccordion: () => void;
}

const ProfileSkills: FC<ProfileSkillsProps> = ({
  existingData,
  isOpen,
  toggleAccordion,
}) => {
  return (
    <AccordionSection>
      <AccordionHeader onClick={toggleAccordion}>
        <AccordionHeaderTitle style={{ color: isOpen ? '' : 'gray' }}>
          Skills
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
          <SkillsDetailsContainer>
            {existingData.skills.map(skill => (
              <SkillsContainer key={skill.id}>
                <ItemContainer>
                  <Input value={skill.name} />
                </ItemContainer>
              </SkillsContainer>
            ))}
          </SkillsDetailsContainer>
        </AccordionContent>
      )}
    </AccordionSection>
  );
};

export default ProfileSkills;
