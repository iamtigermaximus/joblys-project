'use client';
import React, { useState } from 'react';
import IntroPage from '../IntroPage';
import TypeForm from '@/components/typeform/TypeForm';
import ContactField from '@/components/typeform/contact-form/ContactField';
import EducationField from '@/components/typeform/education-form/EducationField';
import EmailField from '@/components/typeform/email-form/EmailField';
import FirstNameField from '@/components/typeform/firstname-form/FirstNameField';
import LanguagesField from '@/components/typeform/languages-form/LanguagesField';
import LastNameField from '@/components/typeform/lastname-form/LastNameField';
import LinksField from '@/components/typeform/links-form/LinksField';
import SkillsField from '@/components/typeform/skills-form/SkillsField';
import WorkExperienceField from '@/components/typeform/professional-form/WorkExperienceField';

import {
  Education,
  Language,
  Link,
  Profile,
  Skill,
  WorkExperience,
} from '@/types/profile';
import { Container } from './ProfileBuilder.styles';

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
