'use client';

import React, { ChangeEvent, FC, useState } from 'react';
import { Profile } from '@/types/profile';
import ProfileBasics from '@/components/profile/profile-form/profile-basic/ProfileBasics';
import ProfileEducation from '@/components/profile/profile-form/profile-education/ProfileEducation';
import ProfileProfessional from '@/components/profile/profile-form/profile-professional/ProfileProfessional';
import ProfileSkills from '@/components/profile/profile-form/profile-skills/ProfileSkills';
import ProfileLanguages from '@/components/profile/profile-form/profile-languages/ProfileLanguages';
import {
  FileUpload,
  ProfileFormContainer,
  SectionTitle,
  SectionTitleContainer,
  UploadButton,
  UploadSection,
} from './ProfileForm.styles';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  LoadingMessage,
  LoadingMessageContainer,
} from '../create-profile/upload-cv/UploadCV.styles';

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
  const router = useRouter();
  const { data: session } = useSession();
  const [cvFile, setCVFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    const file = event.target.files[0];
    setCVFile(file);
  };

  const handleUploadCV = async () => {
    if (!cvFile) return;

    setIsUploading(true);

    let formData = new FormData();
    formData.append('file', cvFile);

    try {
      const resp = await fetch('/api/cv', {
        method: 'POST',
        body: formData,
      });

      if (resp.status === 200) {
        const data = await resp.json();
        setUploadMessage('Upload successful!');
        router.push(`/resume-builder/resumes/${data.body.resumeId}`);
      } else {
        setUploadMessage(`Uploading resume failed: ${resp.status}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadMessage('Uploading resume failed.');
    } finally {
      setIsUploading(false);
    }
  };

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
      {session && (
        <UploadSection>
          <SectionTitleContainer>
            <SectionTitle>Upload existing resume</SectionTitle>
          </SectionTitleContainer>
          <FileUpload
            type="file"
            accept=".docx,.pdf"
            onChange={handleFileChange}
          />
          <UploadButton onClick={handleUploadCV} disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload'}
          </UploadButton>
          <LoadingMessageContainer>
            {uploadMessage && <LoadingMessage>{uploadMessage}</LoadingMessage>}
          </LoadingMessageContainer>
        </UploadSection>
      )}
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
        // handleSaveEdit={handleSaveEdit}
      />
      <ProfileSkills
        existingData={existingData}
        isOpen={accordionState.skills}
        toggleAccordion={() => toggleAccordion('skills')}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleCancelEdit={handleCancelEdit}
        // handleSaveEdit={handleSaveEdit}
      />
      <ProfileLanguages
        existingData={existingData}
        isOpen={accordionState.languages}
        toggleAccordion={() => toggleAccordion('languages')}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleCancelEdit={handleCancelEdit}
        // handleSaveEdit={handleSaveEdit}
      />
    </ProfileFormContainer>
  );
};

export default ProfileForm;
