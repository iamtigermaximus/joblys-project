'use client';

import React, { ChangeEvent, FC, useState, useEffect } from 'react';
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
  setExistingData: React.Dispatch<React.SetStateAction<Profile | null>>;
}

const ProfileForm: FC<ProfileFormProps> = ({
  existingData,
  setExistingData,
}) => {
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
  const [uploadMessageTimeout, setUploadMessageTimeout] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (uploadMessageTimeout) {
        clearTimeout(uploadMessageTimeout);
      }
    };
  }, [uploadMessageTimeout]);

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
      // First, upload to api/cv
      const cvResp = await fetch('/api/cv', {
        method: 'POST',
        body: formData,
      });

      if (cvResp.ok) {
        const cvData = await cvResp.json();
        const structuredCVContent = cvData.body; // assuming structured content is returned here
        console.log('Structured CV Content:', structuredCVContent);

        // Then, post the structured CV to api/profile
        const profileResp = await fetch('/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ profile: structuredCVContent }),
        });

        if (profileResp.ok) {
          const profileResponseData = await profileResp.json();
          setUploadMessage('Upload successful!');

          // Merge structured CV content with existing data
          const updatedProfileData = {
            ...existingData,
            ...profileResponseData.body,
          };

          setExistingData(updatedProfileData);
          setUploadMessage('Upload successful!');
          router.push('/eazyCV/profile');
        } else {
          setUploadMessage(`Uploading profile failed: ${profileResp.status}`);
        }
      } else {
        setUploadMessage(`Uploading CV failed: ${cvResp.status}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadMessage('Uploading resume failed.');
    } finally {
      setIsUploading(false);
      if (uploadMessageTimeout) {
        clearTimeout(uploadMessageTimeout);
      }
      const timeout = setTimeout(() => {
        setUploadMessage('');
      }, 5000);
      setUploadMessageTimeout(timeout);
    }
  };

  const postProfileData = async () => {
    try {
      const resp = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(existingData),
      });

      if (resp.status === 200) {
        const data = await resp.json();
        console.log('Profile data posted successfully:', data);
      } else {
        console.error('Failed to post profile data:', resp.status);
      }
    } catch (error) {
      console.error('Error posting profile data:', error);
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
        setExistingData={setExistingData}
        isOpen={accordionState.basic}
        toggleAccordion={() => toggleAccordion('basic')}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleCancelEdit={handleCancelEdit}
        // handleSaveEdit={handleSaveEdit}
      />
      <ProfileEducation
        existingData={existingData}
        setExistingData={setExistingData}
        isOpen={accordionState.educational}
        toggleAccordion={() => toggleAccordion('educational')}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleCancelEdit={handleCancelEdit}
        // handleSaveEdit={handleSaveEdit}
      />
      <ProfileProfessional
        existingData={existingData}
        setExistingData={setExistingData}
        isOpen={accordionState.professional}
        toggleAccordion={() => toggleAccordion('professional')}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleCancelEdit={handleCancelEdit}
        // handleSaveEdit={handleSaveEdit}
      />
      <ProfileSkills
        existingData={existingData}
        setExistingData={setExistingData}
        isOpen={accordionState.skills}
        toggleAccordion={() => toggleAccordion('skills')}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleCancelEdit={handleCancelEdit}
        // handleSaveEdit={handleSaveEdit}
      />
      <ProfileLanguages
        existingData={existingData}
        setExistingData={setExistingData}
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
