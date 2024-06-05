'use client';

import React, { FC, useState } from 'react';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';
import styled from 'styled-components';
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

  @media (min-width: ${bp.md}) {
    padding: 4px 25px;
  }
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
  color: black;
  padding: 0 3px;
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
    flex-direction: column;
    /* gap: 20px; */
    padding: 4px 25px;
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
  /* margin-bottom: 10px; */
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
    /* margin-bottom: 10px; */
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
    /* margin: 5px 0; */
  }
`;

export const NewLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  /* padding: 4px; */
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
  padding-bottom: 10px;

  @media (min-width: ${bp.md}) {
    padding-bottom: 20px;
  }
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

export const SkillItemContainer = styled.div`
  padding: 4px;
  width: 100%;

  @media (min-width: ${bp.md}) {
    padding: 4px 25px;
  }
`;

export const LanguageItemContainer = styled.div`
  padding: 4px;
  width: 100%;

  @media (min-width: ${bp.md}) {
    padding: 4px 25px;
  }
`;

export const ButtonContainer = styled.div`
  padding: 4px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 5px;

  @media (min-width: ${bp.md}) {
    padding: 4px 25px;
  }
`;

export const AddLinkButtonContainer = styled.div`
  padding: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${bp.md}) {
    padding: 4px 25px;
  }
`;

export const ActionButtonContainer = styled.div`
  padding: 10px 4px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  @media (min-width: ${bp.md}) {
    padding: 30px 25px;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 4px;
  width: 80px;
  background-color: ${colors.purple};
  color: ${colors.white};
  display: flex;
  cursor: pointer;
  white-space: nowrap;
  gap: 2px;

  &:hover {
    background-color: ${colors.darkPurple};
    color: ${colors.white};
  }
`;

export const ActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 4px;
  width: 80px;
  background-color: ${colors.blueGray};
  color: ${colors.white};
  display: flex;
  cursor: pointer;
  white-space: nowrap;
  gap: 2px;

  &:hover {
    background-color: ${colors.purple};
    color: ${colors.white};
  }
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
  const [isEditing, setIsEditing] = useState(false);

  console.log('EXISTINGDATA', existingData);

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

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
  };

  return (
    <ProfileFormContainer>
      <ProfileBasics
        existingData={existingData}
        isOpen={accordionState.basic}
        toggleAccordion={() => toggleAccordion('basic')}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleCancelEdit={handleCancelEdit}
        // handleSaveEdit={handleSaveEdit}
      />
      <ProfileEducation
        existingData={existingData}
        isOpen={accordionState.educational}
        toggleAccordion={() => toggleAccordion('educational')}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleCancelEdit={handleCancelEdit}
        // handleSaveEdit={handleSaveEdit}
      />
      <ProfileProfessional
        existingData={existingData}
        isOpen={accordionState.professional}
        toggleAccordion={() => toggleAccordion('professional')}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleCancelEdit={handleCancelEdit}
        handleSaveEdit={handleSaveEdit}
      />
      <ProfileSkills
        existingData={existingData}
        isOpen={accordionState.skills}
        toggleAccordion={() => toggleAccordion('skills')}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleCancelEdit={handleCancelEdit}
        handleSaveEdit={handleSaveEdit}
      />
      <ProfileLanguages
        existingData={existingData}
        isOpen={accordionState.languages}
        toggleAccordion={() => toggleAccordion('languages')}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleCancelEdit={handleCancelEdit}
        handleSaveEdit={handleSaveEdit}
      />
    </ProfileFormContainer>
  );
};

export default ProfileForm;
