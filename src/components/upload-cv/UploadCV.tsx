'use client';

import React from 'react';

import { breakpoints as bp } from '../../utils/layout';
import colors from '../../utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background: transparent;
  width: 100vw;

  @media (min-width: ${bp.lg}) {
    width: 100%;
    height: 100vh;
    padding: 50px 0;
  }
`;

export const UploadCvContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  padding: 30px 20px;
  margin: 20px;
  flex-direction: column;

  @media (min-width: ${bp.md}) {
    max-width: 500px;
  }
`;

export const SectionTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SectionTitle = styled.h2`
  color: ${colors.purple};
  padding: 5px;
  letter-spacing: 1px;
`;

export const SectionSubTitle = styled.h5`
  color: black;
  padding: 10px;
  letter-spacing: 1px;
`;

export const FileNameContainer = styled.div`
  border: 2px solid ${colors.ashGray};
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
`;

export const FileUpload = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 20px;
  margin: 10px;
  background-color: ${colors.purple};
  color: ${colors.white};
  border-radius: 5px;
`;

export const CancelButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.ashGray};
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  background-color: ${colors.orange};
  color: ${colors.white};
`;

export const UploadButton = styled.div`
  border: 2px solid ${colors.ashGray};
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
  background-color: ${colors.ashGray};
  color: ${colors.purple};
`;
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
        <UploadButton>Upload from Google Drive</UploadButton>
        <UploadButton>Upload from Dropbox</UploadButton>
        <UploadButton>Upload from Microsoft OneDrive</UploadButton>
      </UploadCvContainer>
    </Container>
  );
};

export default UploadCV;
