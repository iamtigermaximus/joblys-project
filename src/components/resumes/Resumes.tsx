'use client';

import React from 'react';
import {
  BuildProfileSection,
  UploadButton,
  Container,
  CreateProfile,
  CreateProfileSection,
  FileType,
  FileTypeContainer,
  Input,
  InputContainer,
  SectionSubTitle,
  SectionTitle,
  SectionTitleContainer,
  UploadCVSection,
  BuildProfileButton,
} from './Resumes.styles';

const Resumes = () => {
  return (
    <Container>
      <CreateProfile>
        <CreateProfileSection>
          <SectionTitleContainer>
            <SectionTitle>Upload CV</SectionTitle>
          </SectionTitleContainer>
          <UploadCVSection>
            <SectionSubTitle>Drop your file to upload</SectionSubTitle>{' '}
            <InputContainer>
              <UploadButton>Choose file</UploadButton>
            </InputContainer>
            <FileTypeContainer>
              <FileType>
                File types: .docx, .doc, .pdf, .txt, .odt or .rtf.
              </FileType>
              <FileType>Upload up to 2.5 MB</FileType>
            </FileTypeContainer>
          </UploadCVSection>
        </CreateProfileSection>
        <CreateProfileSection>
          <SectionTitleContainer>
            <SectionTitle>Build your profile</SectionTitle>
          </SectionTitleContainer>
          <BuildProfileSection>
            <SectionSubTitle>Create your profile in Joblys</SectionSubTitle>
            <InputContainer>
              <BuildProfileButton>Build Profile</BuildProfileButton>
            </InputContainer>
          </BuildProfileSection>
        </CreateProfileSection>
      </CreateProfile>
    </Container>
  );
};

export default Resumes;
