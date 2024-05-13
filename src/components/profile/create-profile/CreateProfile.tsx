'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  CreateProfileContainer,
  PageTitle,
  ProfileFormContainer,
  TitleContainer,
} from './CreateProfile.styles';
import UploadCvSection from './uploadCvSection/UploadCvSection';
import BuildProfileSection from './buildProfileSection/BuildProfileSection';
import { useParams } from 'next/navigation';
import { Resume, initialResume } from '@/types/profile';
import ProfileForm from '@/components/profileBuilderForms/profile-form/ProfileForm';
import BasicTextFields from '@/components/typeform/FirstNameField';
import EmailField from '@/components/typeform/EmailField';
import ContactField from '@/components/typeform/ContactField';
import FirstNameField from '@/components/typeform/FirstNameField';
import LastNameField from '@/components/typeform/LastNameField';
import TypeForm from '@/components/typeform/TypeForm';
import LinksField from '@/components/typeform/LinksField';
import EducationField from '@/components/typeform/EducationField';
import SkillsField from '@/components/typeform/SkillsField';
import LanguagesField from '@/components/typeform/LanguagesField';
import WorkExperienceField from '@/components/typeform/WorkExperienceField';
import IntroPage from '../IntroPage';

const CreateProfile = () => {
  const params = useParams() as { id: string };
  const [resumeInfo, setResumeInfo] = useState(initialResume());
  const [existingData, setExistingData] = useState(false);
  const [recentResume, setRecentResume] = useState<Resume | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleStart = () => {
    setShowForm(true);
  };

  // const fetchRecentResume = useCallback(async () => {
  //   try {
  //     const response = await fetch(`/api/cv`);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch recent resume data');
  //     }
  //     const recentResumeData: Resume = await response.json();
  //     setRecentResume(recentResumeData);
  //   } catch (error) {
  //     console.error('Error fetching recent resume data:', error);
  //   }
  // }, []);

  // const handleStoredResumeUpdate = useCallback(async () => {
  //   const response = await fetch(`/api/cv/${params.id}`);
  //   if (response.status !== 200) {
  //     setExistingData(false);
  //     return;
  //   }
  //   const responseJson = await response.json();
  //   const resumeProfile: Resume | undefined = responseJson.body.profile;

  //   if (!resumeProfile) {
  //     setExistingData(false);
  //     return;
  //   }

  //   setResumeInfo(resumeProfile);
  //   setExistingData(true);
  // }, [params.id]);

  // useEffect(() => {
  //   fetchRecentResume();

  //   handleStoredResumeUpdate();
  // }, [handleStoredResumeUpdate]);

  const onSubmitForm = (formData: Record<string, string>) => {
    console.log('Form submitted with data:', formData);
    // Here, you can handle the form data as needed, such as sending it to a server or processing it further
  };

  return (
    <Container>
      {existingData ? (
        <ProfileFormContainer>
          {/* <ProfileForm
            resumeId={params.id}
            resumeInfo={recentResume || resumeInfo}
            setResumeInfo={setResumeInfo}
            refreshStoredResume={handleStoredResumeUpdate}
          /> */}
        </ProfileFormContainer>
      ) : (
        <>
          {/* <TitleContainer>
            <PageTitle>Please create your profile</PageTitle>
          </TitleContainer>
          <CreateProfileContainer>
            <UploadCvSection />
            <h4>or</h4>
            <BuildProfileSection />
          </CreateProfileContainer> */}
          {!showForm && <IntroPage onStart={handleStart} />}
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
        </>
      )}
    </Container>
  );
};

export default CreateProfile;

