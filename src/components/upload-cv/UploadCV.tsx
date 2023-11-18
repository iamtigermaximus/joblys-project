'use client';

import React from 'react';
import Image from 'next/image';
import GoogleDrive from '../../assets/googledrive.png';
import Dropbox from '../../assets/dropbox.png';
import OneDrive from '../../assets/one-drive.png';
import { useState, ChangeEvent } from 'react';
import {
  CancelButton,
  Container,
  FileNameContainer,
  FileUpload,
  SectionSubTitle,
  SectionTitle,
  SectionTitleContainer,
  UploadButton,
  UploadCvContainer,
  UploadSourceContainer,
} from './UploadCV.styles';

const UploadCV = () => {
  const [cvFile, setCVFile] = useState<File>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const file = event.target.files[0];
    setCVFile(file);
  }

  const handleUploadCV = async () => {
    let formData = new FormData();
    if (cvFile) {
      formData.append("cvFile", cvFile);
      const resp = await fetch('api/cv', {
        method: "POST",
        body: formData
      });
    }
  }

  return (
    <Container>
      <UploadCvContainer>
        <SectionTitleContainer>
          <SectionTitle>Your CV</SectionTitle>
          <SectionSubTitle>Your uploaded CV is listed below.</SectionSubTitle>
        </SectionTitleContainer>
        <FileUpload
          type="file"
          accept=".pdf"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {handleFileChange(e)}} />
        <UploadButton onClick={handleUploadCV}>
          Upload
        </UploadButton>
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
              alt="google-drive"
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
              alt="google-drive"
              priority
            />
          </UploadSourceContainer>
        </UploadButton>
      </UploadCvContainer>
    </Container>
  );
};

export default UploadCV;
