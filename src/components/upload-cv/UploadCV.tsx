import React from 'react';
import Image from 'next/image';
import GoogleDrive from '../../assets/googledrive.png';
import Dropbox from '../../assets/dropbox.png';
import OneDrive from '../../assets/one-drive.png';
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
  return (
    <Container>
      <UploadCvContainer>
        <SectionTitleContainer>
          <SectionTitle>Your CV</SectionTitle>
          <SectionSubTitle>Your uploaded CV is listed below.</SectionSubTitle>
        </SectionTitleContainer>
        <FileNameContainer>SMG_CV.pdf</FileNameContainer>
        <FileUpload>Upload My CV or drop files here</FileUpload>
        <CancelButton>Cancel</CancelButton>
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
