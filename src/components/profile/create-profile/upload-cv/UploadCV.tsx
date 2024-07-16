'use client';

import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import GoogleDrive from '@/assets/googledrive.png';
import Dropbox from '@/assets/dropbox.png';
import OneDrive from '@/assets/one-drive.png';
import {
  Container,
  FileUpload,
  LoadingMessage,
  LoadingMessageContainer,
  SectionSubTitle,
  SectionTitle,
  SectionTitleContainer,
  UploadButton,
  UploadCvContainer,
  UploadSourceContainer,
} from './UploadCV.styles';

const UploadCV = () => {
  const router = useRouter();
  const [cvFile, setCVFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (!event.target.files?.length) {
  //     return;
  //   }
  //   const file = event.target.files[0];
  //   setCVFile(file);
  // };

  // const handleUploadCV = async () => {
  //   if (!cvFile) return;

  //   setIsUploading(true);

  //   let formData = new FormData();
  //   formData.append('file', cvFile);

  //   try {
  //     // First, upload to api/cv
  //     const cvResp = await fetch('/api/cv', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (cvResp.ok) {
  //       const cvData = await cvResp.json();
  //       const structuredCVContent = cvData.body; // assuming structured content is returned here

  //       // Then, post the structured CV to api/profile
  //       const profileResp = await fetch('/api/profile', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ profile: structuredCVContent }),
  //       });

  //       if (profileResp.ok) {
  //         const profileData = await profileResp.json();
  //         setUploadMessage('Upload successful!');
  //         router.push(`/resume-builder/resumes/${profileData.body.id}`);
  //       } else {
  //         setUploadMessage(`Uploading profile failed: ${profileResp.status}`);
  //       }
  //     } else {
  //       setUploadMessage(`Uploading CV failed: ${cvResp.status}`);
  //     }
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     setUploadMessage('Uploading resume failed.');
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };
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
          const profileData = await profileResp.json();
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
    }
  };
  return (
    <Container>
      <UploadCvContainer>
        <SectionTitleContainer>
          <SectionTitle>Your CV</SectionTitle>
          <SectionSubTitle>Your uploaded CV is listed below.</SectionSubTitle>
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
        <UploadButton>
          <UploadSourceContainer>
            <h4> Upload from Google Drive</h4>
            <Image
              src={GoogleDrive}
              width={30}
              height={30}
              alt="google-drive"
              priority
            />
          </UploadSourceContainer>
        </UploadButton>
        <UploadButton>
          <UploadSourceContainer>
            <h4> Upload from Dropbox</h4>
            <Image
              src={Dropbox}
              width={30}
              height={30}
              alt="dropbox"
              priority
            />
          </UploadSourceContainer>
        </UploadButton>
        <UploadButton>
          <UploadSourceContainer>
            <h4> Upload from Microsoft OneDrive</h4>
            <Image
              src={OneDrive}
              width={30}
              height={30}
              alt="onedrive"
              priority
            />
          </UploadSourceContainer>
        </UploadButton>
      </UploadCvContainer>
    </Container>
  );
};

export default UploadCV;
