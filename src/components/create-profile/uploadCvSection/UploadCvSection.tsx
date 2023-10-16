import React from 'react';
import {
  CreateProfileSection,
  FileType,
  FileTypeContainer,
  InputContainer,
  SectionSubTitle,
  SectionTitle,
  SectionTitleContainer,
  UploadButton,
  UploadCVSection,
} from './UploadCvSection.styles';

const UploadCvSection = () => {
  return (
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
  );
};

export default UploadCvSection;
