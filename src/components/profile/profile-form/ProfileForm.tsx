'use client';

import React, { ChangeEvent, FC, useState, useEffect } from 'react';
import { Profile } from '@/types/profile';
import ProfileBasics from '@/components/profile/profile-form/profile-basic/ProfileBasics';
import ProfileEducation from '@/components/profile/profile-form/profile-education/ProfileEducation';
import ProfileProfessional from '@/components/profile/profile-form/profile-professional/ProfileProfessional';
import ProfileSkills from '@/components/profile/profile-form/profile-skills/ProfileSkills';
import ProfileLanguages from '@/components/profile/profile-form/profile-languages/ProfileLanguages';
import {
  FilenameContainer,
  FileUpload,
  FileUploadButton,
  ProfileFormContainer,
  SectionTitle,
  SectionTitleContainer,
  Spinner,
  UploadButton,
  UploadInputContainer,
  UploadSection,
} from './ProfileForm.styles';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { useTranslations } from 'next-intl';
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
  const t = useTranslations('ProfilePage');
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
      const cvResp = await fetch('/api/cv', {
        method: 'POST',
        body: formData,
      });

      if (cvResp.ok) {
        const cvData = await cvResp.json();
        const structuredCVContent = cvData.body;
        console.log('Structured CV Content:', structuredCVContent);

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
            <SectionTitle>{t('uploadTitle')}</SectionTitle>
          </SectionTitleContainer>
          <UploadInputContainer>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FileUpload
                id="file-upload"
                type="file"
                accept=".docx,.pdf"
                onChange={handleFileChange}
                aria-label={t('chooseFile')}
              />
              <FileUploadButton htmlFor="file-upload">
                {cvFile ? t('chooseFile') : t('chooseFile')}
              </FileUploadButton>
              <FilenameContainer>
                {cvFile ? cvFile.name : t('noChosenFile')}
              </FilenameContainer>
            </div>
          </UploadInputContainer>
          <UploadButton
            onClick={handleUploadCV}
            disabled={isUploading}
            style={{
              position: 'relative',
            }}
          >
            {isUploading ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spinner />
                {t('uploading')}
              </div>
            ) : (
              t('upload')
            )}
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
