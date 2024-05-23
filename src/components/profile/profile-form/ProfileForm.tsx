'use client';

import React, { FC, useState } from 'react';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';
import styled from 'styled-components';
import { FaCircleChevronDown, FaCircleChevronUp } from 'react-icons/fa6';
import { Profile } from '@/types/profile';
import ProfileBasics from '@/components/profile/profile-form/profile-basic/ProfileBasics';
import ProfileEducation from '@/components/profile/profile-form/profile-education/ProfileEducation';
import ProfileProfessional from '@/components/profile/profile-form/profile-professional/ProfileProfessional';
import ProfileSkills from '@/components/profile/profile-form/profile-skills/ProfileSkills';
import ProfileLanguages from '@/components/profile/profile-form/profile-languages/ProfileLanguages';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* padding: 100px 30px; */
  overflow-y: scroll;
  /* border: 1px solid red; */
  height: 100vh;
  align-items: center;
  /* background-color: pink; */
  padding: 20px 20px 100px;

  @media (min-width: ${bp.md}) {
    /* padding: 50px; */
  }

  @media (min-width: ${bp.lg}) {
    padding: 100px;
  }
`;

export const ProfileFormContainer = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  /* background-color: pink; */
`;

//STYLES FOR READ-ONLY FORM

export const AccordionSection = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;

export const AccordionHeader = styled.div`
  cursor: pointer;
  background-color: ${colors.white};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #f5f5f5;

  height: 50px;
  padding: 4px;
  align-items: center;
  width: 100%;
`;

export const AccordionHeaderTitle = styled.h1`
  font-weight: 900;
  font-size: 20px;
  color: black;
  font-family: 'Roboto Rounded', sans-serif;
`;
export const AccordionContent = styled.div`
  /* padding: 5px 0; */
  /* padding: 4px; */
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BasicDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  width: 100%;
  color: ${colors.white};
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4px;

  @media (min-width: ${bp.md}) {
    flex-direction: row;
    gap: 20px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4px;
`;

export const Input = styled.input`
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  background-color: #f5f5f5;
  border: none;
  color: black;
  height: 40px;
  margin-bottom: 10px;
  padding: 8px 12px;
  width: 100%;

  &:focus {
    outline: 0.5px solid gray;
  }

  @media (min-width: ${bp.md}) {
    background-color: #f5f5f5;
    border: none;
    color: black;
    height: 40px;
    margin-bottom: 10px;
    padding: 8px 12px;
    width: 100%;

    &:focus {
      outline: 0.5px solid gray;
    }
  }
`;

export const InputLabel = styled.label`
  font-size: 14px;
  color: ${colors.darkPurple};
  letter-spacing: 1px;
  padding: 5px 0;

  @media (min-width: ${bp.md}) {
    margin: 5px 0;
  }
`;

export const NewLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 4px;
`;

export const EducationalDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  width: 100%;
  flex-direction: column;
  color: ${colors.white};
`;

export const EducationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ProfessionalDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  width: 100%;
  margin-bottom: 20px;
  flex-direction: column;
  color: ${colors.white};
`;
export const ProfessionalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SkillsDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  width: 100%;
  color: black;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LanguagesDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  width: 100%;
  color: black;
`;

export const LanguagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TextArea = styled.textarea`
  border-radius: 5px;
  font-size: 14px;
  height: 100px;
  padding: 8px 12px;
  background-color: #f5f5f5;
  color: black;
  border: none;
  margin-bottom: 10px;
  width: 100%;

  &:focus {
    outline: 0.5px solid gray;
  }

  @media (min-width: ${bp.md}) {
    border: none;
    margin-bottom: 20px;
  }
`;

export const DateInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
`;

export const ItemContainer = styled.div`
  padding: 4px;
  width: 100%;
`;

interface ProfileFormProps {
  existingData: Profile;
}

const ProfileForm: FC<ProfileFormProps> = ({ existingData }) => {
  const [accordionState, setAccordionState] = useState({
    basic: true,
    professional: false,
    educational: false,
    skills: false,
    languages: false,
  });

  const toggleAccordion = (section: keyof typeof accordionState) => {
    setAccordionState(prevState => {
      const newState = {
        basic: false,
        professional: false,
        educational: false,
        skills: false,
        languages: false,
      };

      const isSameSection = prevState[section];
      newState[section] = !isSameSection;

      return newState;
    });
  };
  return (
    <ProfileFormContainer>
      <ProfileBasics
        existingData={existingData}
        isOpen={accordionState.basic}
        toggleAccordion={() => toggleAccordion('basic')}
      />
      <ProfileEducation
        existingData={existingData}
        isOpen={accordionState.educational}
        toggleAccordion={() => toggleAccordion('educational')}
      />
      <ProfileProfessional
        existingData={existingData}
        isOpen={accordionState.professional}
        toggleAccordion={() => toggleAccordion('professional')}
      />
      <ProfileSkills
        existingData={existingData}
        isOpen={accordionState.skills}
        toggleAccordion={() => toggleAccordion('skills')}
      />
      <ProfileLanguages
        existingData={existingData}
        isOpen={accordionState.languages}
        toggleAccordion={() => toggleAccordion('languages')}
      />
    </ProfileFormContainer>
  );
};

export default ProfileForm;
