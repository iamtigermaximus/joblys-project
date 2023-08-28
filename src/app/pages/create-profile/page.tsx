'use client';
import PageHeader from '@/components/page-header/PageHeader';
import React from 'react';
import {
  Box,
  BuildYourProfileButton,
  BuildYourProfileContainer,
  Container,
  CreateAccountButton,
  CreateAccountContainer,
  CreateProfileContainer,
  CreateProfileTitle,
  CreateProfileTitleContainer,
  FileType,
  FileTypeContainer,
  Input,
  InputContainer,
  Subtexts,
} from './CreateProfile.styles';

const CreateProfile = () => {
  return (
    <Container>
      <div>
        <title>CREATE PROFILE</title>
      </div>
      <PageHeader />
      <CreateProfileContainer>
        <Box>
          <CreateProfileTitleContainer>
            <CreateProfileTitle>Upload CV</CreateProfileTitle>
          </CreateProfileTitleContainer>
          <Subtexts> Drop your file to upload</Subtexts>
          <InputContainer>
            <Input type="file" id="fileInput" />
          </InputContainer>
          <FileTypeContainer>
            <FileType>
              File types: .docx, .doc, .pdf, .txt, .odt or .rtf. Up to 2.5 MB
            </FileType>
          </FileTypeContainer>
        </Box>
        <h4>or</h4>
        <Box>
          <CreateProfileTitleContainer>
            <CreateProfileTitle>BUILD PROFILE</CreateProfileTitle>
          </CreateProfileTitleContainer>
          <Subtexts>We can help you create your profile</Subtexts>
          <BuildYourProfileContainer href="/pages/create-profile/chatbot">
            <BuildYourProfileButton>BUILD YOUR PROFILE</BuildYourProfileButton>
          </BuildYourProfileContainer>
        </Box>
        <CreateAccountContainer>
          <CreateAccountButton>CREATE ACCOUNT</CreateAccountButton>
        </CreateAccountContainer>
      </CreateProfileContainer>
    </Container>
  );
};

export default CreateProfile;
