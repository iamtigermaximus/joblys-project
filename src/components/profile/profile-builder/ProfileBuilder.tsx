'use client';
import React, { useState } from 'react';
import IntroPage from '../IntroPage';
import TypeForm from '@/components/typeform/TypeForm';
import ContactField from '@/components/typeform/ContactField';
import EducationField from '@/components/typeform/EducationField';
import EmailField from '@/components/typeform/EmailField';
import FirstNameField from '@/components/typeform/FirstNameField';
import LanguagesField from '@/components/typeform/LanguagesField';
import LastNameField from '@/components/typeform/LastNameField';
import LinksField from '@/components/typeform/LinksField';
import SkillsField from '@/components/typeform/SkillsField';
import WorkExperienceField from '@/components/typeform/WorkExperienceField';
import { breakpoints as bp } from '@/utils/layout';
import colors from '@/utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 100px 30px;
  overflow-y: scroll;
  /* border: 1px solid red; */
  height: 100vh;
  align-items: center;
  /* background-color: pink; */

  @media (min-width: ${bp.md}) {
    padding: 50px;
  }

  @media (min-width: ${bp.lg}) {
    padding: 150px;
  }
`;

const ProfileBuilder = () => {
  const [showForm, setShowForm] = useState(false);

  const handleStart = () => {
    setShowForm(true);
  };

  const onSubmitForm = (formData: Record<string, string>) => {
    console.log('Form submitted with data:', formData);
  };
  return (
    <Container>
      {!showForm && <IntroPage onStart={handleStart} />}{' '}
      {showForm && (
        <TypeForm onSubmit={onSubmitForm}>
          <FirstNameField />
          <LastNameField />
          <EmailField />
          <ContactField />
          <LinksField />
          <EducationField />
          <WorkExperienceField />
          <SkillsField />
          <LanguagesField />
        </TypeForm>
      )}
    </Container>
  );
};

export default ProfileBuilder;
