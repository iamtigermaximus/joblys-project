'use client';

import React, { FC, useState } from 'react';
import { Profile } from '@/types/profile';
import ProfileBasics from '@/components/profile/profile-form/profile-basic/ProfileBasics';
import ProfileEducation from '@/components/profile/profile-form/profile-education/ProfileEducation';
import ProfileProfessional from '@/components/profile/profile-form/profile-professional/ProfileProfessional';
import ProfileSkills from '@/components/profile/profile-form/profile-skills/ProfileSkills';
import ProfileLanguages from '@/components/profile/profile-form/profile-languages/ProfileLanguages';
import { ProfileFormContainer } from './ProfileForm.styles';

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
