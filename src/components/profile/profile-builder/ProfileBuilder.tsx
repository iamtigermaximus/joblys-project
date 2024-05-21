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
import {
  Education,
  Language,
  Link,
  Profile,
  Skill,
  WorkExperience,
} from '@/types/profile';

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
  const [formData, setFormData] = useState<Profile>({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    links: [],
    educational: [],
    professional: [],
    skills: [],
    languages: [],
  });
  const handleStart = () => {
    setShowForm(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        body: JSON.stringify({ profile: formData }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload resume');
      }

      const respJson = await response.json();
      const id = respJson?.body?.id;
      if (!id) {
        throw new Error('Did not receive resume id from server');
      }
    } catch (error: any) {
      console.error('Error uploading resume:', error.message);
    }

    console.log('Form submitted with data:', formData);
  };
  return (
    <Container>
      {!showForm && <IntroPage onStart={handleStart} />}
      {showForm && (
        <TypeForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        >
          <FirstNameField
            value={formData.firstName}
            onChange={(value: string) =>
              setFormData({ ...formData, firstName: value })
            }
          />
          <LastNameField
            value={formData.lastName}
            onChange={(value: string) =>
              setFormData({ ...formData, lastName: value })
            }
          />
          <EmailField
            value={formData.email}
            onChange={(value: string) =>
              setFormData({ ...formData, email: value })
            }
          />
          <ContactField
            value={formData.contact}
            onChange={(value: string) =>
              setFormData({ ...formData, contact: value })
            }
          />
          <LinksField
            value={formData.links}
            onChange={(value: Link[]) =>
              setFormData({ ...formData, links: value })
            }
          />

          <EducationField
            value={formData.educational}
            onChange={(value: Education[]) =>
              setFormData({ ...formData, educational: value })
            }
          />

          <WorkExperienceField
            value={formData.professional}
            onChange={(value: WorkExperience[]) =>
              setFormData({ ...formData, professional: value })
            }
          />

          <SkillsField
            value={formData.skills}
            onChange={(value: Skill[]) =>
              setFormData({ ...formData, skills: value })
            }
          />

          <LanguagesField
            value={formData.languages}
            onChange={(value: Language[]) =>
              setFormData({ ...formData, languages: value })
            }
          />
        </TypeForm>
      )}
    </Container>
  );
};

export default ProfileBuilder;
